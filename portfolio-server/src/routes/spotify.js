const express = require('express');
const router = express.Router();
const request = require('request');
const querystring = require('querystring');

const {
    client_id,
    client_secret,
    redirect_uri,
    OWNER_TOKENS,
    generateRandomString,
    stateKey,
    refreshOwnerTokenAndRetry,
    getOwnerRecentTrack
} = require('../utils/spotifyUtils');

router.get('/', (req, res) => {
    res.json({
        message: 'Spotify API Backend',
        endpoints: {
            login: '/spotify/login',
            callback: '/spotify/callback',
            currentlyPlaying: '/spotify/currently-playing',
            recentlyPlayed: '/spotify/recently-played',
            status: '/spotify/status'
        },
        authenticated: !!OWNER_TOKENS.access_token
    });
});

router.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-currently-playing user-read-recently-played';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id,
            scope,
            redirect_uri,
            state
        })
    );
});

router.get('/callback', (req, res) => {
    const { code = null, state = null } = req.query;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        return res.redirect('/spotify#' + querystring.stringify({ error: 'state_mismatch' }));
    }

    res.clearCookie(stateKey);
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code,
            redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            OWNER_TOKENS.access_token = body.access_token;
            OWNER_TOKENS.refresh_token = body.refresh_token;
            OWNER_TOKENS.expires_at = Date.now() + body.expires_in * 1000;

            console.log('Owner authenticated successfully!');
            return res.send(`<p>Authentication Successful! <a href="http://localhost:5173">Go to portfolio</a></p>`);
        }
        res.redirect('/spotify#' + querystring.stringify({ error: 'invalid_token' }));
    });
});

router.get('/status', (req, res) => {
    res.json({
        authenticated: !!OWNER_TOKENS.access_token,
        expires_at: OWNER_TOKENS.expires_at,
        expires_in_minutes: OWNER_TOKENS.expires_at
            ? Math.floor((OWNER_TOKENS.expires_at - Date.now()) / 60000)
            : null
    });
});

router.get('/currently-playing', (req, res) => {
    if (!OWNER_TOKENS.access_token) {
        return res.status(503).json({ error: 'Owner not authenticated. Portfolio owner needs to visit /login first.' });
    }

    if (Date.now() >= OWNER_TOKENS.expires_at) {
        return OWNER_TOKENS.refresh_token
            ? refreshOwnerTokenAndRetry(res, 'currently-playing')
            : res.status(503).json({ error: 'Owner authentication expired.' });
    }

    const options = {
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        headers: { Authorization: 'Bearer ' + OWNER_TOKENS.access_token },
        json: true
    };

    request.get(options, (error, response, body) => {
        if (error) return res.status(500).json({ error: 'Failed to get current track' });

        if (response.statusCode === 401) {
            return OWNER_TOKENS.refresh_token
                ? refreshOwnerTokenAndRetry(res, 'currently-playing')
                : res.status(503).json({ error: 'Owner authentication expired.' });
        }

        if (response.statusCode === 204 || !body || !body.item) {
            return getOwnerRecentTrack(res);
        }

        if (response.statusCode === 200) {
            return res.json({
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
        }

        res.status(response.statusCode).json({ error: 'Unexpected error' });
    });
});

router.get('/recently-played', (req, res) => {
    if (!OWNER_TOKENS.access_token) {
        return res.status(503).json({ error: 'Owner not authenticated. Portfolio owner needs to visit /login first.' });
    }

    if (Date.now() >= OWNER_TOKENS.expires_at) {
        return OWNER_TOKENS.refresh_token
            ? refreshOwnerTokenAndRetry(res, 'recently-played')
            : res.status(503).json({ error: 'Owner authentication expired.' });
    }

    const options = {
        url: 'https://api.spotify.com/v1/me/player/recently-played?limit=10',
        headers: { Authorization: 'Bearer ' + OWNER_TOKENS.access_token },
        json: true
    };

    request.get(options, (error, response, body) => {
        if (error) return res.status(500).json({ error: 'Failed to get recently played tracks' });

        if (response.statusCode === 401) {
            return OWNER_TOKENS.refresh_token
                ? refreshOwnerTokenAndRetry(res, 'recently-played')
                : res.status(503).json({ error: 'Owner authentication expired.' });
        }

        if (response.statusCode === 200 && body.items?.length > 0) {
            const tracks = body.items.map(item => ({
                name: item.track.name,
                artists: item.track.artists.map(a => a.name),
                album: item.track.album.name,
                image: item.track.album.images[0]?.url,
                played_at: item.played_at
            }));
            return res.json({ recently_played: tracks });
        }

        res.json({ message: 'No recently played tracks found' });
    });
});

module.exports = router;