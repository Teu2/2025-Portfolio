const crypto = require("crypto");
const axios = require("axios");
const supabase = require("../supabase/supabaseClient");

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const OWNER_TOKENS = {
    access_token: null,
    refresh_token: null,
    expires_at: null
};

// load tokens from supabase
const loadTokens = async () => {
    try {
        const { data, error } = await supabase
            .from("spotify_tokens")
            .select("*")
            .eq("user_id", "owner")
            .single();

        if (error && error.code !== "PGRST116") { // PGRST116 means no rows found
            console.error("Error loading tokens:", error.message);
            return;
        }

        if (data) {
            OWNER_TOKENS.access_token = data.access_token;
            OWNER_TOKENS.refresh_token = data.refresh_token;
            OWNER_TOKENS.expires_at = data.expires_at;
            console.log(`tokens loaded from Supabase ${data.expires_at}`);
        } else {
            console.log("no tokens found in database");
        }
    } catch (err) {
        console.error("failed to load tokens:", err.message);
    }
};

// saving them tokens to Supabase
const saveTokens = async () => {
    try {
        const { data, error: updateError } = await supabase
            .from("spotify_tokens")
            .update({
                access_token: OWNER_TOKENS.access_token,
                refresh_token: OWNER_TOKENS.refresh_token,
                expires_at: OWNER_TOKENS.expires_at,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', 'owner')
            .select();

        if (updateError) {
            console.error("error updating tokens:", updateError.message);
            return;
        }

        if (!data || data.length === 0) {
            const { error: insertError } = await supabase
                .from("spotify_tokens")
                .insert({
                    user_id: "owner",
                    access_token: OWNER_TOKENS.access_token,
                    refresh_token: OWNER_TOKENS.refresh_token,
                    expires_at: OWNER_TOKENS.expires_at,
                    updated_at: new Date().toISOString()
                });

            if (insertError) {
                console.error("error inserting tokens:", insertError.message);
            } else {
                console.log("tokens inserted to Supabase");
            }
        } else {
            console.log("tokens updated in Supabase");
        }
    } catch (err) {
        console.error("failed to save tokens:", err.message);
    }
};

const updateTokens = async (newTokens) => {
    if (newTokens.access_token) OWNER_TOKENS.access_token = newTokens.access_token;
    if (newTokens.refresh_token) OWNER_TOKENS.refresh_token = newTokens.refresh_token;
    if (newTokens.expires_at) OWNER_TOKENS.expires_at = newTokens.expires_at;
    await saveTokens();
};

const generateRandomString = (length) => crypto.randomBytes(60).toString("hex").slice(0, length);
const stateKey = "spotify_auth_state";

const getOwnerRecentTrack = async (res) => {
    try {
        const response = await axios.get(
            "https://api.spotify.com/v1/me/player/recently-played?limit=1",
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
        return res.json({ message: "No recently played tracks found." });
    } catch (err) {
        console.error("Error fetching recent track:", err.message);
        return res.status(500).json({ error: "Failed to fetch recent track" });
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
    updateTokens,
    loadTokens
};