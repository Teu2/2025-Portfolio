const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const TOKENS_FILE = path.join(__dirname, '..', 'data', 'tokens.json');

const OWNER_TOKENS = {
    access_token: null,
    refresh_token: null,
    expires_at: null
};

const ensureDataDir = () => {
    const dataDir = path.dirname(TOKENS_FILE);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
};

const loadTokens = () => {
    try {
        if (fs.existsSync(TOKENS_FILE)) {
            const data = fs.readFileSync(TOKENS_FILE, 'utf8');
            const tokens = JSON.parse(data);

            OWNER_TOKENS.access_token = tokens.access_token;
            OWNER_TOKENS.refresh_token = tokens.refresh_token;
            OWNER_TOKENS.expires_at = tokens.expires_at;

            console.log('Tokens loaded from storage');
        }
    } catch (err) {
        console.error('Failed to load tokens:', err.message);
    }
};

const saveTokens = () => {
    try {
        ensureDataDir();
        fs.writeFileSync(TOKENS_FILE, JSON.stringify(OWNER_TOKENS, null, 2));
    } catch (err) {
        console.error('Failed to save tokens:', err.message);
    }
};

const updateTokens = (newTokens) => {
    if (newTokens.access_token) OWNER_TOKENS.access_token = newTokens.access_token;
    if (newTokens.refresh_token) OWNER_TOKENS.refresh_token = newTokens.refresh_token;
    if (newTokens.expires_at) OWNER_TOKENS.expires_at = newTokens.expires_at;
    saveTokens();
};

const generateRandomString = (length) => crypto.randomBytes(60).toString('hex').slice(0, length);
const stateKey = 'spotify_auth_state';

const getOwnerRecentTrack = async (res) => {
    try {
        const response = await axios.get(
            'https://api.spotify.com/v1/me/player/recently-played?limit=1',
            {
                headers: {
                    Authorization: `Bearer ${OWNER_TOKENS.access_token}`
                }
            }
        );

        const item = response.data.items?.[0];
        if (item) {
            return res.json({
                currently_playing: false,
                track: {
                    name: item.track.name,
                    artists: item.track.artists.map((a) => a.name),
                    album: item.track.album.name,
                    image: item.track.album.images[0]?.url,
                    played_at: item.played_at
                }
            });
        }
        return res.json({ message: 'No recently played tracks found.' });
    } catch (err) {
        console.error('Error fetching recent track:', err.message);
        return res.status(500).json({ error: 'Failed to fetch recent track' });
    }
};

loadTokens();

module.exports = {
    client_id,
    client_secret,
    redirect_uri,
    OWNER_TOKENS,
    generateRandomString,
    stateKey,
    getOwnerRecentTrack,
    updateTokens
};
