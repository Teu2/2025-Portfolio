
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

export const projects = [
    {
        title: "RESTful API",
        tech: "python",
        techStack: [
            "Python",
            "Flask",
            "SQLAlchemy",
            "Docker",
            "JWT"
        ],
        desc: "A RESTful API built with Flask, SQLAlchemy and JWT, providing CRUD operations",
        demo: "https://example.com/demo",
        github: "https://github.com/example/python-sorting"
    },
    {
        title: "IMAGE Reader",
        tech: "javascript",
        techStack: [
            "JavaScript",
            "React",
            "Tesseract OCR",
            "Translation API",
        ],
        img: imageReader,
        desc: "Translates text from images using Tesseract OCR and a Translation API.",
        demo: "https://imagetranslator.netlify.app/",
        github: "https://github.com/Teu2/Image-Reader"
    },
    {
        title: "Books Manager",
        tech: "csharp",
        techStack: [
            "C#",
            "ASP.NET",
            "MVC",
            "Razor",
            "Entity",
            "SQL Server",
        ],
        img: bookManager,
        desc: "A CRUD web application for managing books, built with ASP.NET MVC and Entity Framework.",
        demo: "https://github.com/Teu2/ASP.NET-Books-Manager",
        github: "https://github.com/Teu2/ASP.NET-Books-Manager"
    },
    {
        title: "Discord Twitter Bot",
        tech: "csharp",
        techStack: [
            "C#",
            ".NET",
            "Discord.NET",
            "Twitter API",
        ],
        img: discordBot,
        desc: "A Discord bot that fetches and displays tweets from a specified Twitter account.",
        demo: "https://github.com/Teu2/Discord-Twitter-Bot",
        github: "https://github.com/Teu2/Discord-Twitter-Bot"
    },
    {
        title: "Tic Tac Toe w/ AI",
        tech: "csharp",
        techStack: [
            "C#",
            ".NET",
            "DSA",
            "WPF",
            "AI",
        ],
        img: tictactoe,
        desc: "A Tic Tac Toe game with an AI opponent using the MiniMax algorithm, built using WPF and C#.",
        demo: "https://github.com/Teu2/.NET-Tic-Tac-Toe-MiniMax",
        github: "https://github.com/Teu2/.NET-Tic-Tac-Toe-MiniMax"
    },
    // {
    //     title: "Tetris Clone",
    //     tech: "csharp",
    //     techStack: [
    //         "C#",
    //         ".NET",
    //         "DSA",
    //         "WPF",
    //     ],
    //     img: tetris,
    //     desc: "A Tetris clone built following a tutorial, using WPF and C#, with a focus on learning the basics of WPF.",
    //     demo: "https://github.com/Teu2/.NET-Tic-Tac-Toe-MiniMax",
    //     github: "https://github.com/Teu2/.NET-Tic-Tac-Toe-MiniMax"
    // },
    {
        title: "Inference Engine",
        tech: "csharp",
        techStack: [
            "C#",
            ".NET",
            "DSA",
            "Console",
            "AI",
        ],
        img: inferenceEngine,
        desc: "An inference engine built in C# using a console application, demonstrating basic AI concepts.",
        demo: "https://github.com/Teu2/Inference-Engine",
        github: "https://github.com/Teu2/Inference-Engine"
    },
    {
        title: "Maze Navigation App",
        tech: "csharp",
        techStack: [
            "C#",
            ".NET",
            "DSA",
            "Console",
            "AI",
        ],
        img: mazeNavigation,
        desc: "A maze navigation console application built in C#, using BFS, DFS, A* and GBFS algorithms.",
        demo: "https://github.com/Teu2/Maze-Navigation-Console",
        github: "https://github.com/Teu2/Maze-Navigation-Console"
    },
    {
        title: "NSCL Web Based Dataset",
        tech: "javascript",
        techStack: [
            "HTML",
            "CSS",
            "PHP",
            "JavaScript",
            "MySQL",
        ],
        img: nsclab,
        desc: "A web-based dataset for software bugs and patches, include fuzzy search, filtering, sorting and pagination.",
        demo: "https://nsclabdataset.netlify.app/",
        github: "https://github.com/Teu2/NSCWebBasedDataSet"
    }
];
