
// import python1 from "../assets/proj-python-1.png";
// import js1 from "../assets/proj-js-1.png";
import yomiSnap from "../../assets/project images/yomi-snap.png";
import discordBot from "../../assets/project images/discord.png";
import tictactoe from "../../assets/project images/tictactoe.png";
import inferenceEngine from "../../assets/project images/inference-engine.png";
import mazeNavigation from "../../assets/project images/maze-navigation.png";
import ellenex from "../../assets/project images/ellenex.png";
import porfolio from "../../assets/project images/portfolio.png";
import restful from "../../assets/project images/restfulapi.png";
import eforensic from "../../assets/project images/eforensic.png"
import cracker from "../../assets/project images/cracker.png"
import portfolioserver from "../../assets/project images/portfolio-server.png"
import dotnetSvg from "../../assets/tech stack icons/dotnet.svg"
import pythonSvg from "../../assets/tech stack icons/python.svg"
import jsSvg from "../../assets/tech stack icons/javascript.svg"
import tsSvg from "../../assets/tech stack icons/typescript-icon.svg"
import nodeSvg from "../../assets/tech stack icons/nodejs-icon.svg"

export const projects = [
    {
        title: "Prompt Smith - A GenAI API",
        inProgress: true,
        tech: "backend",
        techStack: [
            "Python",
            "Flask",
            "SQLAlchemy",
            "Alembic",
            "PostgreSQL",
            "Docker",
            "Redis",
            "Celery",
            "Helmet",
            "CORS",
            "JWT",
            "Pytest",
            "OpenAI GPT-3.5"
        ],
        language: pythonSvg,
        img: restful,
        desc: "A GenAI API used for generating narratives, characters, and world building. Perfect for devs and writers.",
        descExt: "This RESTful API provides endpoints for generating game narratives, characters, and world building elements using advanced AI models. The API is Ideal for game developers or storywriters looking to enhance their world and storytelling capabilities! I use this quite frequently too for my own world building projects 🤭",
        demo: "https://example.com/demo",
        github: "https://github.com/example/python-sorting"
    },
    {
        title: "Yomi Snap - An OCR Translator",
        inProgress: false,
        tech: "frontend",
        techStack: [
            "JavaScript",
            "React",
            "SCSS",
            "Axios",
            "Tesseract OCR",
            "Translation API",
        ],
        language: jsSvg,
        img: yomiSnap,
        desc: "Translates Japanese text in images using the Tesseract OCR and a Translation API.",
        descExt: "YomiSnap is a web application that bridges the language gap for Japanese content. You can upload any image containing Japanese text, manga pages, street signs, documents, and get instant translations in your preferred language. I personally think this tool is great for language learners and travelers 😁",
        features: ["Translates extracted Japanese text into English, Korean (한국어), Czech (Česky), or French (Français).", "Handles complex Japanese characters including kanji, hiragana, katakana.", "Drag and drop interface with real-time processing feedback.", " Handles both horizontal and vertical Japanese text layouts.", "Combines multiple images for batch processing.",],
        demo: "https://imagetranslator.netlify.app/",
        github: "https://github.com/Teu2/Image-Reader"
    },
    {
        title: "2025 Portfolio Client",
        inProgress: false,
        tech: "frontend",
        techStack: [
            "JavaScript",
            "React",
            "Vite",
            "SCSS",
            "Axios",
            "EmailJS",
            "Weather API",
            "React Icons",
        ],
        language: jsSvg,
        img: porfolio,
        desc: "My personal portfolio website, showcasing my projects and skills! Built with React and Vite.",
        descExt: "A modern and intuitve front end client for my portfolio that showcases my development journey and projects! It was built from scratch with a focus on user experience, performance, and personal branding which I'm working on 🤗",
        features: ["Category-based navigation system for easy project discovery.", "Real-time music display of my personal Spotify activity.", "Interactive chatbot component.", "Weather API call displaying current conditions in Melbourne.", "Contact form with email integration for easy communication.", "Optimized experience across desktop, tablet, and mobile devices.", "Dark and light mode toggle for user preference. (Planned)", "WCAG compliant design with proper contrast and navigation.", "Fast loading times with efficient asset management."],
        demo: "https://dominicyeoh.netlify.app/",
        github: "https://github.com/Teu2/2025-Portfolio"
    },
    {
        title: "2025 Portfolio Server",
        inProgress: false,
        tech: "backend",
        techStack: [
            "JavaScript",
            "Node.js",
            "Express",
            "Axios",
            "Spotify API",
            "OAuth2",
            "CORS",
            "Helmet",
            "SupaBase",
            "Hugging Face",
            "SmolLM2 1.7B",
        ],
        language: nodeSvg,
        img: portfolioserver,
        desc: "A Node.js server for my portfolio that fetches my Spotify activity and provides a chatbot for the frontend.",
        descExt: "A Node.js and Express server that works with my portfolio's Spotify integration and a AI chatbot feature. The server implements secure OAuth 2.0 flows, intelligent token management, and robust API orchestration. I built it with the best security practices in mind and also designed it for scalability. It currently serves real time music data from Spotify, and serves a conversational AI integration for my chatbot component! 🥳",
        features: ["Spotify integration to retrieve latest Spotify activity.", "AI chatbot integration for Front-end Chatbot component", "Uses Hugging Face and the SmolLM2-1.7B-Instruct Mmodel.", "Secure OAuth 2.0 authentication for Spotify API with automatic token refresh.", "Helmet, CORS, and custom auth middleware for robust security.", "Rate limiting on endpoints to prevent abuse.", "Orchestrated API calls for real-time track data with fallback to recent plays.", "Modular structure designed for scalability."],
        demo: "https://dominicyeoh.netlify.app/",
        github: "https://github.com/Teu2/2025-Portfolio"
    },
    {
        title: "Ellenex Monitoring IoT Platform",
        inProgress: false,
        tech: "fullstack",
        techStack: [
            "TypeScript",
            "Angular",
            "SCSS",
            "Leaflet",
            "Tailwind",
            "InfluxDB",
        ],
        language: tsSvg,
        img: ellenex,
        desc: "A Full-Stack application for monitoring IoT devices that I significantly contributed to during my time at Ellenex.",
        demo: "https://auth.ellenex.net/login?response_type=code&client_id=go7ub2sqap0m0d8b618a8it2c&redirect_uri=https://ellenex.net",
    },
    {
        title: "Toki - A Discord Bot",
        inProgress: false,
        tech: "bots",
        techStack: [
            "C#",
            ".NET",
            "Discord.NET",
            "Twitter API",
        ],
        language: dotnetSvg,
        img: discordBot,
        desc: "A Discord bot that fetches and displays tweets from my friends or a specified Twitter account.",
        demo: "https://github.com/Teu2/Discord-Twitter-Bot",
        github: "https://github.com/Teu2/Discord-Twitter-Bot"
    },
    {
        title: "Tic Tac Toe - AI Bot",
        inProgress: false,
        tech: "bots",
        techStack: [
            "C#",
            ".NET",
            "DSA",
            "WPF",
            "AI",
            "Minimax",
        ],
        language: dotnetSvg,
        img: tictactoe,
        desc: "A Tic Tac Toe game with an AI opponent using the MiniMax algorithm, built using WPF and C#.",
        descExt: "A WPF-based Tic Tac Toe game built in C# using .NET 6.0. I implemented the MiniMax algorithm to create an unbeatable AI opponent, making it a great demonstration of applying classic AI decision-making to real gameplay. This project was built during an AI course to better understand game theory, recursion, and heuristic evaluation functions! 🙂‍↕️",
        features:["Player vs AI experience with polished game interaction.", "Built using WPF for a modern and responsive UI.", "Implements the MiniMax algorithm for optimal AI decision making.", "Detects win and draw states, then highlights the winning line.", "Clean architecture using C# and .NET 6.0."],
        demo: "https://github.com/Teu2/.NET-Tic-Tac-Toe-MiniMax",
        github: "https://github.com/Teu2/.NET-Tic-Tac-Toe-MiniMax"
    },
    {
        title: "Inference Engine",
        inProgress: false,
        tech: "algorithms",
        techStack: [
            "C#",
            ".NET",
            "DSA",
            "Console",
            "AI",
            "FC",
            "BC",
            "TTC",
        ],
        language: dotnetSvg,
        img: inferenceEngine,
        desc: "An inference engine built in C# using forward chaining & backward chaining, demonstrating basic AI concepts.",
        descExt: "This logical inference engine is basically a playground for core AI reasoning concepts that I wrote during University. It takes your “facts” (a knowledge base or KB) and runs three different algorithms to see if your query holds up. Want to see how machines validate conclusions from given premises? Go ahead and try it out! 😎",
        features: ["Forward Chaining (FC) algorithm for deriving new facts.", "Backward Chaining (BC) algorithm for goal-driven reasoning.", "Truth Table (TT) Checker", "Console based interface for easy interaction."],
        demo: "https://github.com/Teu2/Inference-Engine",
        github: "https://github.com/Teu2/Inference-Engine"
    },
    {
        title: "Maze Navigation App",
        inProgress: false,
        tech: "algorithms",
        techStack: [
            "C#",
            ".NET",
            "DSA",
            "Console",
            "AI",
            "BFS",
            "DFS",
            "GBFS",
            "A*",
        ],
        language: dotnetSvg,
        img: mazeNavigation,
        desc: "A maze navigation console application built in C#, using BFS, DFS, A* and GBFS algorithms.",
        descExt: "This is a console application I wrote during University that simulates a maze navigation scenario. It uses various pathfinding algorithms like BFS, DFS, A*, and GBFS to find the shortest path through a maze. You can even visualize the maze and the pathfinding process in real-time! It's a great way to understand how these algorithms work in practice! 🤓",
        features: ["Visualizes the maze and pathfinding process in real-time.", "Supports multiple pathfinding algorithms: BFS, DFS, A* and GBFS to find the shortest path.", "Console based interface for easy interaction.", "Search statistics after completion (Total nodes searched, Order of moves, etc).", "Modular Code Structure.", "Separates grid parsing, maze building, and each search strategy into its own class/method "],
        demo: "https://github.com/Teu2/Maze-Navigation-Console",
        github: "https://github.com/Teu2/Maze-Navigation-Console"
    },
    // {
    //     title: "Cracko - A Password Cracker",
    //     inProgress: false,
    //     tech: "pentesting",
    //     techStack: [
    //         "Python",
    //         "Hashlib",
    //         "Pycryptodome",
    //         "Zipfile",
    //     ],
    //     language: pythonSvg,
    //     img: cracker,
    //     desc: "A password cracker designed to crack hashed passwords & protected files using various attacks.",
    //     demo: "https://example.com/demo",
    //     github: "https://github.com/Teu2/Maze-Navigation-Console"
    // },
    // {
    //     title: "E-Forensic Capstone Report",
    //     inProgress: false,
    //     tech: "pentesting",
    //     techStack: [
    //         "Sans Sift",
    //         "Wireshark",
    //         "UnDBX",
    //         "Autopsy",
    //     ],
    //     img: eforensic,
    //     desc: "A digital forensic report from Swinburne, outlining evidence discovery and relevance in an investigation.",
    //     demo: "https://example.com/demo",
    // },
];
