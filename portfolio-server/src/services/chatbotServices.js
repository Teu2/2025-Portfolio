const OpenAI = require("openai");
const { system_content, inputSanitization } = require('../utils/chatbotUtils');

// https://huggingface.co/docs/transformers.js/en/tutorials/node
// https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct

const apiKey = process.env.OPENAI_API_KEY

class MyClassificationPipeline { // this class is from an earlier hugging face implementation, I couldn't be bothered deleting it so its stuck here now :)
    static async getInstance(userPrompt) {
        const openai = new OpenAI({
            apiKey: apiKey
        });
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: system_content },
                    { role: "user", content: userPrompt }
                ],
                max_tokens: 70,
                temperature: 0.7
            });
            const generated = completion.choices[0].message.content;
            return { status: 200, message: generated };
        } catch (err) {
            console.error("OpenAI API error:", err);
            return { status: 500, error: "OpenAI request failed" };
        }
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
            message:
            "Invalid or unsafe message. Please remove angle brackets or control characters.",
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