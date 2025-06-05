const http = require('http');
const querystring = require('querystring');
const url = require('url');
const fs = require('fs');
const path = require('path');

const { chatbot_secret, system_content } = require('../utils/chatbotUtils');

class MyClassificationPipeline {
    static task = 'text-generation';
    static model = 'HuggingFaceTB/SmolLM2-1.7B-Instruct';

    static async getInstance(userPrompt) {
        let { pipeline, env } = await import('@huggingface/transformers');
        const generator = await pipeline(
            "text-generation",
            "HuggingFaceTB/SmolLM2-1.7B-Instruct",
        );

        const messages = [
            { role: "system", content: system_content },
            { role: "user", content: userPrompt },
        ];

        const output = await generator(messages, { max_new_tokens: 128 });

        if (output) {
            return { status: 200, message: output[0].generated_text.at(-1).content } 
        } 

        return { status: 500, error: "Failed to retrieve response from SmolLM2." };
    }
}

exports.chatWithModel = async (req, res) => {
    // console.log("Request Headers:", req.headers);
    // console.log("Request Body:", req.body);
    // console.log("Request Url:", req.url);
    // console.log(`user promt = ${userPrompt}`);
    // console.log(`system content\n ${system_content}`);
    // console.log("Response Status Code:", res.statusCode);
    // console.log("Response Headers Sent:", res.headersSent);

    let userPrompt = req.body.message;

    try {
        const chatbotResponse = await MyClassificationPipeline.getInstance(userPrompt);
        if (chatbotResponse) {
            return { status: 200, message: chatbotResponse.message }
        }
    } catch (err) {
        return { status: 500, message: chatbotResponse.error }
    }
}

// https://huggingface.co/docs/transformers.js/en/tutorials/node
// https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct