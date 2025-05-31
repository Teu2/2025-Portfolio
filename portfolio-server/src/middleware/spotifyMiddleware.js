// using shared secret header for Spotify API request - JWT too much la
module.exports = function requireHeader(req, res, next) {
    const sentSecret = req.headers['x-spotify-secret'];
    const validSecret = process.env.SPOTIFY_API_SECRET;
    if (!sentSecret || sentSecret !== validSecret) {
        return res.status(401).json({ error: 'Unauthorized: missing or invalid x-spotify-secret' });
    }
    next();
};