import React, { useState } from 'react'
import { projects } from './Projects'
import "./ProfileProjects.scss"

// components
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { FaPython } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import { TbBrandGolang } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { HiOutlineFilm } from "react-icons/hi";
import { FaFileVideo } from "react-icons/fa";
import { PiFilmSlateFill } from "react-icons/pi";
import { IoFilm } from "react-icons/io5";
import { SiDavinciresolve } from "react-icons/si";

export const ProfileProjects = () => {

    const filters = [
        { label: "All Projects", value: "all", icon: <FaLayerGroup /> },
        { label: "Python", value: "python", icon: <FaPython /> },
        { label: ".NET", value: "csharp", icon: <FaHashtag /> },
        { label: "JavaScript", value: "javascript", icon: <IoLogoJavascript /> },
        { label: "Video Editing", value: "editing", icon: <SiDavinciresolve /> },
    ];

    const [activeFilter, setActiveFilter] = useState("all");
    const filtered = activeFilter === "all" ? projects : projects.filter(p => p.tech === activeFilter);

    return (
        <div className="profile-projects-parent">
            <h1>Projects</h1>
            <p>Here are some of the projects i've worked on! go ahead and feel free to check them out, I even made a simple filtering option to make your life easier if you want to browse by a particular category! 🙌</p>
            <div className="filter-bar">
                {filters.map(filter => (
                    <div key={filter.value} onClick={() => setActiveFilter(filter.value)} className={`filter-button ${activeFilter === filter.value ? "active" : ""}`}>
                        {filter.icon} {filter.label}
                    </div>
                ))}
            </div>

            <div className="project-list">
                {filtered.map((project, idx) => (
                    <div key={idx} className="project-card">
                        {/* <img src={project.image} alt={project.title} /> */}
                        <h4>{project.title}</h4>
                        <p>{project.desc}</p>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">View Code</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
