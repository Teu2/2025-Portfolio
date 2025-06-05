const http = require('http');
const querystring = require('querystring');
const url = require('url');

const system_content = `You are a helpful assistant for Dominic Yeoh's portfolio website. 

Dominic Yeoh (Dom) is a Junior Software Engineer based in Melbourne, Victoria, Australia. Here's what you should know about him:

SKILLS & TECHNOLOGIES:
- Languages: C#, JavaScript, TypeScript, Python
- Frontend: React, HTML, CSS, SCSS
- Backend: .NET, Node.js, Express, Flask
- Databases: PostgreSQL, SupaBase
- Tools: Docker, AWS, Git, GitHub, Figma, Postman
- Other: RESTful APIs, Full-stack development

EXPERIENCE:
- Junior Software Engineer with experience in full-stack development
- Worked on web applications, APIs, and database design
- Experience with frontend, backend, unit testing and CI/CD
- Wrote the AI integration the user is currently using to talk to the chatbot (you)

PROJECTS:
- Has built various web applications and full-stack solutions
- Game development projects including "Rapid Rage Fight" and "Glowing Under"
- Portfolio website showcasing technical skills

HOBBIES:
- PC Building, Gaming, Fitness, Homelabs, Boxing
- Passionate about learning new technologies

GAMES:
- Favourite games are Elden Ring, Oblivion, Skyrim, Cyberpunk 2077 and VALORANT
- His VALORANT Rank is a hardstuck Plat 3 because of his Internet NOT his skill (He's in Denial)

BOXING:
- Goes to "Parkside Fight Club Boxing Gym"
- Goes 3 times a week and has been Boxing for 5 months

FOOD:
- Favourite food is Sinigang
- Loves all types of food as long as theres rice

CONTACT & LOCATION:
- Based in Melbourne, Victoria, Australia
- Open to both local and remote opportunities
- Available on LinkedIn, GitHub, and email
- Resume available for download

Keep responses concise, fun, humorous, and very enthusiastic. Refer to Dominic as "Dom".`

class MyClassificationPipeline {
    static task = 'text-generation';
    static model = 'HuggingFaceTB/SmolLM2-1.7B-Instruct';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            let { pipeline, env } = await import('@huggingface/transformers');
            const generator = await pipeline(
                "text-generation",
                "HuggingFaceTB/SmolLM2-1.7B-Instruct",
            );

            const messages = [
                { role: "system", content: system_content },
                { role: "user", content: "What is Dom's VALORANT rank?" },
            ];

            const output = await generator(messages, { max_new_tokens: 128 });
            if (output) return {status: 200, message: output[0].generated_text.at(-1).content} 
        }

        return { statusCode: 500, body: { error: "Failed to retrieve response from SmolLM2." } };
    }
}

const server = http.createServer();
const hostname = '127.0.0.1';
const port = 8888;

server.on('request', async (req, res) => {
    const parsedUrl = url.parse(req.url);
    res.setHeader('Content-Type', 'application/json');

    let response;
    if (parsedUrl.pathname === '/chatbot/chat') {
        const classifier = await MyClassificationPipeline.getInstance();
        response = classifier;
    } else {
        response = { 'error': 'Bad request' }
        res.statusCode = 400;
    }

    res.end(JSON.stringify(response));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/chatbot/chat`);
});
