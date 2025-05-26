
// import python1 from "../assets/proj-python-1.png";
// import js1 from "../assets/proj-js-1.png";
import imageReader from "../../assets/project images/image-reader.png";
import discordBot from "../../assets/project images/discord.png";
import bookManager from "../../assets/project images/book-manager.png";
import nsclab from "../../assets/project images/nsclab.png";
import tictactoe from "../../assets/project images/tictactoe.png";
import tetris from "../../assets/project images/tetris.png";
import inferenceEngine from "../../assets/project images/inference-engine.png";
import mazeNavigation from "../../assets/project images/maze-navigation.png";
import ellenex from "../../assets/project images/ellenex.png";
import porfolio from "../../assets/project images/portfolio.png";
import restful from "../../assets/project images/restfulapi.png";
import social from "../../assets/project images/social.png"
import link from "../../assets/project images/link.png"

import dotnetSvg from "../../assets/tech stack icons/dotnet.svg"
import pythonSvg from "../../assets/tech stack icons/python.svg"
import jsSvg from "../../assets/tech stack icons/javascript.svg"
import tsSvg from "../../assets/tech stack icons/typescript-icon.svg"
import aPro from "../../assets/tech stack icons/apro.svg"

export const projects = [
    {
        title: "GenAI RESTful API (In Progress)",
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
        title: "LINK Community (In Progress)",
        tech: "fullstack",
        techStack: [
            "JavaScript",
            "React",
            "Node",
            "Express",
            "MySQL",
            "Socket.io"
        ],
        language: jsSvg,
        img: link,
        desc: "A Full-Stack social media app for Gamers, includes typical social media elements & infinite scrolling.",
        demo: "https://example.com/demo",
        github: "https://github.com/example/python-sorting"
    },
    {
        title: "IMAGE Reader",
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
        title: "2025 Portfolio",
        tech: "frontend",
        techStack: [
            "JavaScript",
            "React",
            "EmailJS",
            "Spotify API",
            "Vite",
        ],
        language: jsSvg,
        img: porfolio,
        desc: "My personal portfolio website, showcasing my projects and skills! Built with React and Vite.",
        demo: "https://dominicyeoh.netlify.app/",
        github: "https://dominicyeoh.netlify.app/"
    },
    {
        title: "Ellenex Monitoring IoT Platform",
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
    // {
    //     title: "Books Manager",
    //     tech: "fullstack",
    //     techStack: [
    //         "C#",
    //         "ASP.NET",
    //         "MVC",
    //         "Razor",
    //         "Entity",
    //         "SQL Server",
    //     ],
    //     language: dotnetSvg,
    //     img: bookManager,
    //     desc: "A CRUD web application for managing books, built with ASP.NET MVC and Entity Framework.",
    //     demo: "https://github.com/Teu2/ASP.NET-Books-Manager",
    //     github: "https://github.com/Teu2/ASP.NET-Books-Manager"
    // },
    {
        title: "Toki - A Discord Bot",
        tech: "backend",
        techStack: [
            "C#",
            ".NET",
            "Discord.NET",
            "Twitter API",
        ],
        language: pythonSvg,
        img: discordBot,
        desc: "A Discord bot that fetches and displays tweets from my friends or a specified Twitter account.",
        demo: "https://github.com/Teu2/Discord-Twitter-Bot",
        github: "https://github.com/Teu2/Discord-Twitter-Bot"
    },
    {
        title: "Tic Tac Toe w/ AI",
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
    // {
    //     title: "Tetris Clone",
    //     tech: "games",
    //     techStack: [
    //         "C#",
    //         ".NET",
    //         "DSA",
    //         "WPF",
    //         "Tutorial",
    //     ],
    //     language: dotnetSvg,
    //     img: tetris,
    //     desc: "A Tetris clone built following a tutorial, using WPF and C#, with a focus on learning the basics of WPF.",
    //     demo: "https://github.com/Teu2/.NET-Tic-Tac-Toe-MiniMax",
    //     github: "https://github.com/Teu2/.NET-Tic-Tac-Toe-MiniMax"
    // },
    {
        title: "Inference Engine",
        tech: "console",
        techStack: [
            "C#",
            ".NET",
            "DSA",
            "Console",
            "AI",
        ],
        language: dotnetSvg,
        img: inferenceEngine,
        desc: "An inference engine built in C# using a console application, demonstrating basic AI concepts.",
        demo: "https://github.com/Teu2/Inference-Engine",
        github: "https://github.com/Teu2/Inference-Engine"
    },
    {
        title: "Maze Navigation App",
        tech: "console",
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
    // {
    //     title: "NSCL Web Based Dataset",
    //     tech: "fullstack",
    //     techStack: [
    //         "HTML",
    //         "CSS",
    //         "PHP",
    //         "JavaScript",
    //         "MySQL",
    //     ],
    //     language: jsSvg,
    //     img: nsclab,
    //     desc: "A web-based dataset for software bugs and patches, include fuzzy search, filtering, sorting and pagination.",
    //     demo: "https://nsclabdataset.netlify.app/",
    //     github: "https://github.com/Teu2/NSCWebBasedDataSet"
    // }
];
