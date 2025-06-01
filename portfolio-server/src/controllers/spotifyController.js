const querystring = require('querystring');
const spotifyService = require('../services/spotifyServices');
const { generateRandomString, stateKey, OWNER_TOKENS, getOwnerRecentTrack } = require('../utils/spotifyUtils');
const axios = require('axios');

const frontEndUrl =process.env.FRONTEND_URL

exports.root = (req, res) => {
    res.json({
        message: 'Spotify API Backend',
        endpoints: {
            login: '/login',
            callback: '/callback',
            currentlyPlaying: '/currently-playing',
            recentlyPlayed: '/recently-played',
            status: '/status'
        },
        authenticated: !!OWNER_TOKENS.access_token
    });
};

exports.login = (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 300000 // 5 minutes
    });

    const scope = 'user-read-currently-playing user-read-recently-played';
    const params = querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope,
        redirect_uri: process.env.REDIRECT_URI,
        state
    });

    res.redirect('https://accounts.spotify.com/authorize?' + params);
};

exports.callback = async (req, res) => {
    const { code, state } = req.query;
    const storedState = req.cookies?.[stateKey];
    
    if (!code || typeof code !== 'string' || !state || typeof state !== 'string') {
        return res.status(400).send('Invalid request parameters');
    }

    if (!state || state !== storedState) {
        return res.redirect('/spotify#' + querystring.stringify({ error: 'state_mismatch' }));
    }

    res.clearCookie(stateKey);
    const result = await spotifyService.exchangeCodeForToken(code);
    if (result.success) {
        res.send(`<p>Authenticated! <a href=${frontEndUrl}>Back to Portfolio</a></p>`);
    } else {
        res.redirect('/spotify#' + querystring.stringify({ error: 'invalid_token' }));
    }
};

exports.status = (req, res) => {
    res.json({
        authenticated: !!OWNER_TOKENS.access_token,
        expires_at: OWNER_TOKENS.expires_at,
        expires_in_minutes: OWNER_TOKENS.expires_at
            ? Math.floor((OWNER_TOKENS.expires_at - Date.now()) / 60000)
            : null
    });
};

exports.currentlyPlaying = async (req, res) => {
    const result = await spotifyService.getCurrentlyPlaying();
    console.log(`[exports.currentlyPlaying()] - (result.status) = ${result.status}`);

    if (result.status === 'refresh') {
        console.log(`result.status === '${result.status}'`);
        return spotifyService.refreshOwnerTokenAndRetry(res, 'currently-playing');
    }

    if (result.status === 'recent') {
        console.log("result.status === 'recent'")
        return getOwnerRecentTrack(res);
    }  

    return res.status(result.statusCode || 200).json(result.body);
};

exports.recentlyPlayed = async (req, res) => {
    const result = await spotifyService.getRecentlyPlayed();

    if (result.status === 'refresh') {
        return spotifyService.refreshOwnerTokenAndRetry(res, 'recently-played');
    }

    return res.status(result.statusCode || 200).json(result.body);
};

exports.health = async (req, res) => {
    const health = {
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
        checks: {
            server: 'UP',
            authentication: OWNER_TOKENS.access_token ? 'UP' : 'DOWN',
            token_expiry: OWNER_TOKENS.expires_at > Date.now() ? 'VALID' : 'EXPIRED'
        }
    };

    if (OWNER_TOKENS.access_token) {
        try {
            await axios.get('https://api.spotify.com/v1/me', {
                headers: { Authorization: `Bearer ${OWNER_TOKENS.access_token}` },
                timeout: 2000
            });
            health.checks.spotify_connectivity = 'UP';
        } catch (err) {
            health.checks.spotify_connectivity = 'DOWN';
            health.status = 'DEGRADED';
        }
    }

    const statusCode = health.status === 'UP' ? 200 : 503;
    res.status(statusCode).json(health);
};