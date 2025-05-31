
// import python1 from "../assets/proj-python-1.png";
// import js1 from "../assets/proj-js-1.png";
import imageReader from "../../assets/project images/image-reader.png";
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
        title: "GenAI RESTful API",
        inProgress: true,
        tech: "backend",
        techStack: [
            "Python",
            "Flask",
            "SQLAlchemy",
            "Docker",
            "Redis",
            "JWT"
        ],
        language: pythonSvg,
        img: restful,
        desc: "A GenAI API for Game Narratives and World-Building, perfect for game developers and writers.",
        demo: "https://example.com/demo",
        github: "https://github.com/example/python-sorting"
    },
    {
        title: "IMAGE Reader",
        inProgress: false,
        tech: "frontend",
        techStack: [
            "JavaScript",
            "React",
            "Tesseract OCR",
            "Translation API",
        ],
        language: jsSvg,
        img: imageReader,
        desc: "Translates Japanese text from images using Tesseract OCR and a Translation API.",
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
            "EmailJS",
            "Weather API",
            "Vite",
        ],
        language: jsSvg,
        img: porfolio,
        desc: "My personal portfolio website, showcasing my projects and skills! Built with React and Vite.",
        demo: "https://github.com/Teu2/2025-Portfolio",
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
            "Spotify API",
            "OAuth2",
        ],
        language: nodeSvg,
        img: portfolioserver,
        desc: "A Node.js server for my portfolio that fetches my Spotify activity and provides a chatbot for the frontend.",
        demo: "https://github.com/Teu2/2025-Portfolio",
        github: "https://github.com/Teu2/2025-Portfolio"
    },
    {
        title: "Ellenex Monitoring IoT Platform",
        inProgress: false,
        tech: "fullstack",
        techStack: [
            "TypeScript",
            "Angular",
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
        title: "Tic Tac Toe w/ AI",
        inProgress: false,
        tech: "games",
        techStack: [
            "C#",
            ".NET",
            "DSA",
            "WPF",
            "AI",
        ],
        language: dotnetSvg,
        img: tictactoe,
        desc: "A Tic Tac Toe game with an AI opponent using the MiniMax algorithm, built using WPF and C#.",
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
        ],
        language: dotnetSvg,
        img: inferenceEngine,
        desc: "An inference engine built in C# using forward chaining & backward chaining, demonstrating basic AI concepts.",
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
        ],
        language: dotnetSvg,
        img: mazeNavigation,
        desc: "A maze navigation console application built in C#, using BFS, DFS, A* and GBFS algorithms.",
        demo: "https://github.com/Teu2/Maze-Navigation-Console",
        github: "https://github.com/Teu2/Maze-Navigation-Console"
    },
    {
        title: "Cracky - A Password Cracker",
        inProgress: false,
        tech: "pentesting",
        techStack: [
            "Python",
            "Hashlib",
            "Pycryptodome",
            "Zipfile",
        ],
        language: pythonSvg,
        img: cracker,
        desc: "A password cracker designed to crack hashed passwords & protected files using various attacks.",
        demo: "https://example.com/demo",
        github: "https://github.com/Teu2/Maze-Navigation-Console"
    },
    {
        title: "E-Forensic Capstone Report",
        inProgress: false,
        tech: "pentesting",
        techStack: [
            "Sans Sift",
            "Wireshark",
            "UnDBX",
            "Autopsy",
        ],
        img: eforensic,
        desc: "A digital forensic report from Swinburne, outlining evidence discovery and relevance in an investigation.",
        demo: "https://example.com/demo",
    },
];
