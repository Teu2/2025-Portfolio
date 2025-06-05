
// using shared secret header for Chatbot API requests - keeping it simple like Spotify
module.exports = function requireHeader(req, res, next) {
    const sentSecret = req.headers['x-chatbot-secret'];
    const validSecret = process.env.CHATBOT_API_SECRET;
    
    if (!sentSecret || sentSecret !== validSecret) {
        return res.status(401).json({ 
            error: 'Unauthorized: missing or invalid x-chatbot-secret' 
        });
    }
    
    next();
};