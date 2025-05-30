require('dotenv').config();

var express = require('express');
var request = require('request');
var crypto = require('crypto');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

// Spotify api credentials
var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET; 
var redirect_uri = process.env.REDIRECT_URI;
var port = process.env.PORT;
var corsOrigins = process.env.CORS_ORIGINS ? 
    process.env.CORS_ORIGINS.split(',').map(origin => origin.trim()) : 
    ['http://localhost:5173', 'https://dominicyeoh.netlify.app'];

// tokens for use
let OWNER_TOKENS = {
    access_token: null,
    refresh_token: null,
    expires_at: null
};

const generateRandomString = (length) => {
    return crypto
        .randomBytes(60)
        .toString('hex')
        .slice(0, length);
}

var stateKey = 'spotify_auth_state';
var app = express();

app.use(express.static(__dirname + '/public'))
    .use(cors({
        origin: ['http://localhost:5173', 'https://dominicyeoh.netlify.app'],
        credentials: true
    }))
    .use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        message: 'Spotify API Backend',
        endpoints: {
            login: '/login',
            callback: '/callback',
            currentlyPlaying: '/currently-playing - Public endpoint showing owner\'s music',
            recentlyPlayed: '/recently-played - Public endpoint showing owner\'s music',
            status: '/status - Check if owner is authenticated'
        },
        authenticated: !!OWNER_TOKENS.access_token
    });
});

// needed to authenticate myself with spotify
app.get('/login', function (req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    var scope = 'user-read-currently-playing user-read-recently-played';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

// callback after i authenticate
app.get('/callback', function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                // stores tokens in OWNER_TOKENS
                OWNER_TOKENS.access_token = body.access_token;
                OWNER_TOKENS.refresh_token = body.refresh_token;
                OWNER_TOKENS.expires_at = Date.now() + (body.expires_in * 1000);

                console.log('Owner authenticated successfully!');
                res.send(`
                    <p>Authentication Successful! <a href="http://localhost:5173">Go to your portfolio</a></p>
                `);
                
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

// checks for authentication
app.get('/status', function (req, res) {
    res.json({
        authenticated: !!OWNER_TOKENS.access_token,
        expires_at: OWNER_TOKENS.expires_at,
        expires_in_minutes: OWNER_TOKENS.expires_at ? Math.floor((OWNER_TOKENS.expires_at - Date.now()) / 60000) : null
    });
});

// show currently playing track to portfolio visitors
app.get('/currently-playing', function (req, res) {
    if (!OWNER_TOKENS.access_token) {
        return res.status(503).json({ 
            error: 'Owner not authenticated. Portfolio owner needs to visit /login first.' 
        });
    }

    // check if silly token did an expired
    if (Date.now() >= OWNER_TOKENS.expires_at) {
        if (OWNER_TOKENS.refresh_token) {
            return refreshOwnerTokenAndRetry(res, 'currently-playing');
        } else {
            return res.status(503).json({ 
                error: 'Owner authentication expired. Portfolio owner needs to re-authenticate.' 
            });
        }
    }

    var options = {
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        headers: { 'Authorization': 'Bearer ' + OWNER_TOKENS.access_token },
        json: true
    };

    request.get(options, function (error, response, body) {
        if (error) {
            return res.status(500).json({ error: 'Failed to get current track' });
        }

        if (response.statusCode === 401) {
            if (OWNER_TOKENS.refresh_token) {
                return refreshOwnerTokenAndRetry(res, 'currently-playing');
            } else {
                return res.status(503).json({ error: 'Owner authentication expired.' });
            }
        } else if (response.statusCode === 204 || !body || !body.item) {
            getOwnerRecentTrack(res); // if no track currently playing, fetch the last played track
        } else if (response.statusCode === 200) {
            res.json({
                currently_playing: body.is_playing,
                track: {
                    name: body.item.name,
                    artists: body.item.artists.map(a => a.name),
                    album: body.item.album.name,
                    image: body.item.album.images[0]?.url,
                    progress_ms: body.progress_ms,
                    duration_ms: body.item.duration_ms
                }
            });
        } else {
            res.status(response.statusCode).json({ error: 'Unexpected error' });
        }
    });
});

// shows my recently played tracks to portfolio visitors
app.get('/recently-played', function (req, res) {
    if (!OWNER_TOKENS.access_token) {
        return res.status(503).json({ 
            error: 'Owner not authenticated. Portfolio owner needs to visit /login first.' 
        });
    }

    if (Date.now() >= OWNER_TOKENS.expires_at) {
        if (OWNER_TOKENS.refresh_token) {
            return refreshOwnerTokenAndRetry(res, 'recently-played');
        } else {
            return res.status(503).json({ 
                error: 'Owner authentication expired. Portfolio owner needs to re-authenticate.' 
            });
        }
    }

    var options = {
        url: 'https://api.spotify.com/v1/me/player/recently-played?limit=10',
        headers: { 'Authorization': 'Bearer ' + OWNER_TOKENS.access_token },
        json: true
    };

    request.get(options, function (error, response, body) {
        if (error) {
            return res.status(500).json({ error: 'Failed to get recently played tracks' });
        }

        if (response.statusCode === 401) {
            if (OWNER_TOKENS.refresh_token) {
                return refreshOwnerTokenAndRetry(res, 'recently-played');
            } else {
                return res.status(503).json({ error: 'Owner authentication expired.' });
            }
        } else if (response.statusCode === 200) {
            if (body.items && body.items.length > 0) {
                var tracks = body.items.map(item => ({
                    name: item.track.name,
                    artists: item.track.artists.map(a => a.name),
                    album: item.track.album.name,
                    image: item.track.album.images[0]?.url,
                    played_at: item.played_at
                }));
                res.json({ recently_played: tracks });
            } else {
                res.json({ message: 'No recently played tracks found' });
            }
        } else {
            res.status(response.statusCode).json({ error: 'Unexpected error' });
        }
    });
});

function getOwnerRecentTrack(res) {
    var recentOptions = {
        url: 'https://api.spotify.com/v1/me/player/recently-played?limit=1',
        headers: { 'Authorization': 'Bearer ' + OWNER_TOKENS.access_token },
        json: true
    };

    request.get(recentOptions, function (error, response, body) {
        if (!error && response.statusCode === 200 && body.items && body.items.length > 0) {
            var lastPlayed = body.items[0];
            res.json({
                currently_playing: false,
                track: {
                    name: lastPlayed.track.name,
                    artists: lastPlayed.track.artists.map(a => a.name),
                    album: lastPlayed.track.album.name,
                    image: lastPlayed.track.album.images[0]?.url,
                    played_at: lastPlayed.played_at
                }
            });
        } else {
            res.json({ message: 'No recently played tracks found' });
        }
    });
}

function refreshOwnerTokenAndRetry(res, endpoint) {
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: OWNER_TOKENS.refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            OWNER_TOKENS.access_token = body.access_token;
            OWNER_TOKENS.expires_at = Date.now() + (body.expires_in * 1000);
            
            console.log('token refreshed successfully');
            
            res.redirect('/' + endpoint);
        } else {
            console.error('Failed to refresh owner token');
            res.status(503).json({ error: 'Failed to refresh authentication. Owner needs to re-authenticate.' });
        }
    });
}

app.listen(port, () => {
    console.log('\n🎵 Spotify Portfolio Backend');
    console.log('======================================================================');
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Port: ${port}`);
    console.log(`CORS Origins: ${corsOrigins.join(', ')}`);
    console.log(`Client ID: ${client_id ? 'Set' : 'Missing'}`);
    console.log(`Client Secret: ${client_secret ? 'Set' : 'Missing'}`);
    console.log('======================================================================');
    console.log('SETUP INSTRUCTIONS (For me :3)');
    console.log('1. Visit: http://127.0.0.1:8888/login');
    console.log('2. After authentication, the portfolio will show my Spotify activity');
    console.log('3. Visitors can see your music without needing to authenticate');
    console.log('======================================================================');
    console.log('Endpoints:');
    console.log(`- Status: http://127.0.0.1:8888/status`);
    console.log(`- Currently Playing: http://127.0.0.1:8888/currently-playing`);
    console.log(`- Recently Played: http://127.0.0.1:8888/recently-played`);
    console.log('=====================================================================');
    console.log(`Server running on http://127.0.0.1:8888/`);
    console.log('=====================================================================');
});