const chatbotService = require('../services/chatbotServices');

exports.chat = async (req, res) => {
    console.log("in controller - starting chat request");
    
    try {
        const result = await chatbotService.chatWithModel(req, res);
        console.log("in controller - chat processing completed");
        
        return res.status(result.status || 200).json({
            message: result.message
        });
        
    } catch (error) {
        console.error("Controller error:", error.message);
        
        if (!res.headersSent) {
            return res.status(result.status || 503).json({
                error: "Chat service failed",
                details: error.message
            });
        }
    }
}

exports.health = async (req, res) => {
    try {
        const result = await chatbotService.health(req, res);
        console.log("health check completed");
        
        return res.status(result.status || 200).json({
            message: result.message
        });
        
    } catch (error) {
        console.error("health controller error occurred");
        
        if (!res.headersSent) {
            return res.status(result.status || 503).json({
                error: "Health check failed"
            });
        }
    }
}