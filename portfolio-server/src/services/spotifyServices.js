const axios = require('axios');
const querystring = require('querystring');
const { client_id, client_secret, redirect_uri, OWNER_TOKENS, updateTokens } = require('../utils/spotifyUtils');

exports.exchangeCodeForToken = async (code) => {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token',
            querystring.stringify({
                code,
                redirect_uri,
                grant_type: 'authorization_code'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
                }
            }
        );

        const body = response.data;
        
        await updateTokens({
            access_token: body.access_token,
            refresh_token: body.refresh_token,
            expires_at: Date.now() + body.expires_in * 1000
        });

        return { success: true };
    } catch (err) {
        console.error('Token exchange error:', err.message);
        return { success: false };
    }
};

exports.getCurrentlyPlaying = async () => {
    
    if (!OWNER_TOKENS.access_token) return { status: 503, body: { error: 'Not authenticated' } };
    if (Date.now() >= OWNER_TOKENS.expires_at) return { status: 'refresh' };

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { Authorization: `Bearer ${OWNER_TOKENS.access_token}` }
        });

        if (!response.data || !response.data.item){
            return { status: "recent" };
        } 

        return {
            status: 200,
            body: {
                currently_playing: response.data.is_playing,
                track: {
                    name: response.data.item.name,
                    artists: response.data.item.artists.map(a => a.name),
                    album: response.data.item.album.name,
                    image: response.data.item.album.images[0]?.url,
                    progress_ms: response.data.progress_ms,
                    duration_ms: response.data.item.duration_ms
                }
            }
        };
    } catch (err) {
        console.log(`Error fetching currently playing track: ${err.message}`);
        if (err.response?.status === 401) return { status: "refresh" };
        return { statusCode: 500, body: { error: `Failed to fetch current track, Don't worry, this is a temporary issue! Dom will fix it soon!` } };
    }
};

exports.getRecentlyPlayed = async () => {
    if (!OWNER_TOKENS.access_token) return { status: 503, body: { error: "Not authenticated" } };
    if (Date.now() >= OWNER_TOKENS.expires_at) return { status: "refresh" };

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
            headers: { Authorization: `Bearer ${OWNER_TOKENS.access_token}` }
        });

        const items = response.data.items || [];
        return {
            status: 200,
            body: {
                recently_played: items.map(item => ({
                    name: item.track.name,
                    artists: item.track.artists.map(a => a.name),
                    album: item.track.album.name,
                    image: item.track.album.images[0]?.url,
                    played_at: item.played_at
                }))
            }
        };
    } catch (err) {
        console.log(`Error fetching currently playing track: ${err.message}`);
        if (err.response?.status === 401) return { status: "refresh" };
        return { statusCode: 500, body: { error: "Failed to fetch recently played tracks" } };
    }
};

// refreshes token when the token becomes old and expired ;c
exports.refreshOwnerTokenAndRetry = async (res, endpoint) => {
    console.log(`Refreshing token for endpoint: ${endpoint} -- res: ${res}`);
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token',
            querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: OWNER_TOKENS.refresh_token
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
                }
            }
        );

        const body = response.data;
        updateTokens({
            access_token: body.access_token,
            expires_at: Date.now() + body.expires_in * 1000
        });
        console.error("Redirecting to endpoint: /spotify/", endpoint);
        return res.redirect(`/spotify/${endpoint}`);
    } catch (err) {
        console.error("Token refresh failed", err.message);
        return res.status(503).json({ error: "Failed to refresh token" });
    }
};