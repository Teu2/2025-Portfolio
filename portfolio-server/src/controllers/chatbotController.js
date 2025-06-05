const querystring = require('querystring');
const chatbotService = require('../services/chatbotServices');
const axios = require('axios');

exports.chat = async (req, res) => {
    console.log("in controller - starting chat request");
    
    try {
        const result = await chatbotService.chatWithModel(req, res);
        console.log("in controller - chat processing completed");
        
        return res.status(200).json({
            message: result.message
        });
        
    } catch (error) {
        console.error("Controller error:", error.message);
        
        if (!res.headersSent) {
            return res.status(500).json({
                error: "Chat service failed",
                details: error.message
            });
        }
    }
}