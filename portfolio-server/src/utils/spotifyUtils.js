const crypto = require('crypto');
const request = require('request');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const OWNER_TOKENS = {
    access_token: null,
    refresh_token: null,
    expires_at: null
};

const generateRandomString = length =>
    crypto.randomBytes(60).toString('hex').slice(0, length);

const stateKey = 'spotify_auth_state';

const refreshOwnerTokenAndRetry = (res, endpoint) => {
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: OWNER_TOKENS.refresh_token
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            OWNER_TOKENS.access_token = body.access_token;
            OWNER_TOKENS.expires_at = Date.now() + body.expires_in * 1000;
            console.log('Token refreshed successfully! yay :3');
            res.redirect(`/spotify/${endpoint}`);
        } else {
            console.error('Failed to refresh owner token :c');
            res.status(503).json({ error: 'Failed to refresh authentication, need to re-authenticate.' });
        }
    });
};

const getOwnerRecentTrack = (res) => {
    const options = {
        url: 'https://api.spotify.com/v1/me/player/recently-played?limit=1',
        headers: { Authorization: 'Bearer ' + OWNER_TOKENS.access_token },
        json: true
    };

    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200 && body.items?.length > 0) {
            const item = body.items[0];
            return res.json({
                currently_playing: false,
                track: {
                    name: item.track.name,
                    artists: item.track.artists.map(a => a.name),
                    album: item.track.album.name,
                    image: item.track.album.images[0]?.url,
                    played_at: item.played_at
                }
            });
        }
        res.json({ message: 'No recently played tracks found... :c' });
    });
};

module.exports = {
    client_id,
    client_secret,
    redirect_uri,
    OWNER_TOKENS,
    generateRandomString,
    stateKey,
    refreshOwnerTokenAndRetry,
    getOwnerRecentTrack
};