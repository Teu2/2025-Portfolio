const OpenAI = require("openai");
const { system_content, inputSanitization } = require('../utils/chatbotUtils');
const { chat } = require("../controllers/chatbotController");

// https://huggingface.co/docs/transformers.js/en/tutorials/node
// https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct

const apiKey = process.env.OPENAI_API_KEY
const chatSessions = new Map();

class MyClassificationPipeline {
    static getChatHistory(sessionId = 'default') {
        if (!chatSessions.has(sessionId)) {
            chatSessions.set(sessionId, [
                { role: "system", content: system_content }
            ]);
        }
        return chatSessions.get(sessionId);
    }

    static clearChatHistory(sessionId = 'default') {
        chatSessions.delete(sessionId);
    }

    static async getInstance(userPrompt, sessionId = 'default', maxHistoryLength = 10) {
        const openai = new OpenAI({
            apiKey: apiKey
        });

        try {
            const chatHistory = this.getChatHistory(sessionId);
            chatHistory.push({ role: "user", content: userPrompt });

            if (chatHistory.length > maxHistoryLength) {
                const systemMessage = chatHistory[0];
                const recentMessages = chatHistory.slice(-(maxHistoryLength - 1));
                chatHistory.splice(0, chatHistory.length, systemMessage, ...recentMessages);
            }

            console.log(`Chat history length for session ${sessionId}: ${chatHistory.length}`);

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: chatHistory,
                max_tokens: 70,
                temperature: 0.7
            });

            const generated = completion.choices[0].message.content;
            chatHistory.push({ role: "assistant", content: generated });

            return { 
                status: 200, 
                message: generated,
                sessionId: sessionId,
                historyLength: chatHistory.length - 1 
            };

        } catch (err) {
            console.error("OpenAI API error:", err);
            return { status: 500, error: "OpenAI request failed" };
        }
    }

    static getConversationHistory(sessionId = 'default') {
        const history = this.getChatHistory(sessionId);
        return history.slice(1); 
    }

    static resetConversation(sessionId = 'default') {
        if (chatSessions.has(sessionId)) {
            const systemMessage = chatSessions.get(sessionId)[0];
            chatSessions.set(sessionId, [systemMessage]);
        }
        return { status: 200, message: "Conversation reset" };
    }
}

exports.chatWithModel = async (req, res) => {
    console.log("1.");
    const { message } = req.body;

    // test with postman
    if (!message) return { status: 400, message: "You must provide a prompt!" }
    if (typeof message !== 'string') return { status: 400, message: "Message must be a string!" }
    if (message.length > 100) return { status: 400, message: "Message too long (max 100 characters)!" }
    if (message.trim().length === 0) return { status: 400, message: "Message cannot be empty!" }

    
    if(!inputSanitization(message)) {
        return {
            status: 400,
            message: "Invalid or unsafe message. Please remove angle brackets or control characters.",
        };
    }

    try {
        console.log("2.");
        const chatbotResponse = await MyClassificationPipeline.getInstance(message);
        if (chatbotResponse) {
            return { status: 200, message: chatbotResponse.message }
        }
    } catch (err) {
        return { status: 500, message: chatbotResponse.error }
    }
}

exports.health = async (req, res) => {
    try {
        console.log("health check initiated");
        
        if (!apiKey) {
            console.log("openAI API key missing");
            return { 
                status: 503, 
                message: "Service configuration error" 
            };
        }

        const OpenAI = require("openai");
        const openai = new OpenAI({
            apiKey: apiKey
        });

        const testCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "test" }],
            max_tokens: 1,
            temperature: 0
        });

        if (testCompletion) {
            console.log("health check passed");
            return { 
                status: 200, 
                message: "Chatbot service is healthy - OpenAI connection verified" 
            };
        }
    } catch (err) {
        console.log("health check failed");
        return { 
            status: 503, 
            message: "Service temporarily unavailable"
        };
    }
};