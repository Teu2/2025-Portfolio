const querystring = require('querystring');
const spotifyService = require('../services/spotifyServices');
const { generateRandomString, stateKey, OWNER_TOKENS, getOwnerRecentTrack } = require('../utils/spotifyUtils');

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
    res.cookie(stateKey, state);

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

    if (!state || state !== storedState) {
        return res.redirect('/spotify#' + querystring.stringify({ error: 'state_mismatch' }));
    }

    res.clearCookie(stateKey);
    const result = await spotifyService.exchangeCodeForToken(code);
    if (result.success) {
        res.send(`<p>Authenticated! <a href="http://localhost:5173">Back to Portfolio</a></p>`);
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

    if (result.status === 'refresh') {
        return spotifyService.refreshOwnerTokenAndRetry(res, 'currently-playing');
    }

    if (result.status === 'recent') {
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
