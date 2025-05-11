import React, { useState } from 'react'
import { projects } from './Projects'
import "./ProfileProjects.scss"

// icons
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

// icons
import dotnetSvg from "../../assets/tech stack icons/dotnet.svg"
import pythonSvg from "../../assets/tech stack icons/python.svg"
import jsSvg from "../../assets/tech stack icons/javascript.svg"
import tsSvg from "../../assets/tech stack icons/typescript-icon.svg"
import aPro from "../../assets/tech stack icons/apro.svg"
import { FaGithub } from "react-icons/fa6";

import { FiArrowUpRight } from "react-icons/fi";

export const ProfileProjects = () => {

    const [tooltipVisibleProjects, setTooltipVisibleProjects] = useState(false);
    const [tooltipVisibleCategories, setTooltipVisibleCategories] = useState(false);
    const [projectCount, setProjectCount] = useState(0);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    
    const handleMouseMove = (e) => {
        setTooltipPos({ x: e.clientX + 5, y: e.clientY - 40}); // small offset
    };
    
    const handleProjectCount = () => {
        var count = 0;
        projects.forEach((projects) =>{
            count++;
        })

        return `${count} Projects`;
    }

    const filters = [
        { label: "All Projects", value: "all", icon: <FaLayerGroup /> },
        { label: "Python", value: "python", icon: pythonSvg },
        { label: ".NET", value: "csharp", icon: dotnetSvg },
        { label: "JavaScript", value: "javascript", icon: jsSvg },
        { label: "TypeScript", value: "typescript", icon: tsSvg },
        // { label: "Video Editing", value: "editing", icon: aPro },
    ];

    const [activeFilter, setActiveFilter] = useState("all");
    const filtered = activeFilter === "all" ? projects : projects.filter(p => p.tech === activeFilter);

    return (
        <div className="profile-projects-parent">
            <div data-aos="fade-up" data-aos-duration="300">
                <h1>Projects</h1>
                <p>Here are some of the {' '}
                    <span span className="green hover" onMouseEnter={() => setTooltipVisibleProjects(true)} onMouseLeave={() => setTooltipVisibleProjects(false)} onMouseMove={handleMouseMove}><a href="https://github.com/Teu2" target='_blank' className='link'>{"{Projects}"}</a></span> 
                    {' '}
                    i've worked on! go ahead and feel free to check them out, I even made a simple filtering option to make your life easier if you want to browse by a particular 
                    {' '}
                    <span span className="green hover" onMouseEnter={() => setTooltipVisibleCategories(true)} onMouseLeave={() => setTooltipVisibleCategories(false)} onMouseMove={handleMouseMove}><a href="" className='link'>{"{Category}"}</a></span>
                    {' 🙌'}  
                    
                </p>

                {tooltipVisibleProjects && (
                    <div className="tooltip" style={{left: tooltipPos.x, top: tooltipPos.y,}}>{handleProjectCount()}</div>
                )}

                {tooltipVisibleCategories && (
                    <div className="tooltip" style={{left: tooltipPos.x, top: tooltipPos.y,}}>{"setActiveFilter(filter.value)"}</div>
                )}
            </div>

            <div className="filter-bar" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                {filters.map(filter => (
                    <div key={filter.value} onClick={() => setActiveFilter(filter.value)} className={`filter-button ${activeFilter === filter.value ? "active" : ""}`}>
                        {console.log(`${typeof filter.icon} - ${filter.label}`)}
                        {typeof filter.icon === "string" ? <img src={filter.icon} alt="icon" className="skill-icon"/> : filter.icon}
                        {filter.label}
                    </div>
                ))}
            </div>

            <div className="project-list" data-aos="fade-up" data-aos-delay="400" data-aos-duration="300">
                {filtered.map((project, idx) => (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <div key={idx} className="project-card">
                            {/* <img src={project.image} alt={project.title} /> */}
                            <div className="title">
                                <h4>{project.title}</h4>
                                <FiArrowUpRight />
                            </div>
                            <div className="project-image">
                                {project.img ? <img src={project.img} alt={project.title} /> : <div className="no-image"><p>In Progress</p></div>}
                            </div>
                            <div className="project-desc">
                                <p>{project.desc}</p>
                            </div>
                            <div className="project-bottom">
                                <div className="project-stack">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i}>{tech}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
