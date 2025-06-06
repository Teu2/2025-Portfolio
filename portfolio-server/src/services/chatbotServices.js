const OpenAI = require("openai");
const { system_content } = require('../utils/chatbotUtils');

// https://huggingface.co/docs/transformers.js/en/tutorials/node
// https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct

class MyClassificationPipeline { // this class is from an earlier hugging face implementation, I couldn't be bothered deleting it so its stuck here now :)
    static async getInstance(userPrompt) {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
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
            return { status: 500, error: err.message || "OpenAI request failed" };
        }
    }
}

exports.chatWithModel = async (req, res) => {
    console.log("1.");
    const { message } = req.body;
    if (!message) return { status: 500, message: "You must provide a prompt!" }

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
