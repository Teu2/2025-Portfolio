import React, { useState } from 'react'
import { projects } from './Projects'
import "./ProfileProjects.scss"

// icons
import { FaLayerGroup } from "react-icons/fa";
import { FaDiceD6 } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { FaServer } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { ImPacman } from "react-icons/im";
import { FaUnlock } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";
import { FaCodeBranch } from "react-icons/fa6";

// components
import { ProfileProjectPage } from '../profile project page/ProfileProjectPage';

export const ProfileProjects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [tooltipVisibleProjects, setTooltipVisibleProjects] = useState(false);
    const [tooltipVisibleCategories, setTooltipVisibleCategories] = useState(false);
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
        { label: "Front-End", value: "frontend", icon: <FaPaintBrush /> },
        { label: "Back-End", value: "backend", icon: <FaServer /> },
        { label: "Full-Stack", value: "fullstack", icon: <FaDiceD6 /> },
        { label: "Algorithms", value: "algorithms", icon: <FaShareNodes /> },
        { label: "Bots", value: "bots", icon: <RiRobot2Fill /> },
        { label: "Machine Learning", value: "machinelearning", icon: <FaCodeBranch /> },
        { label: "Pentesting / Hacking", value: "pentesting", icon: <FaUnlock /> },
        
    ];

    const [activeFilter, setActiveFilter] = useState("all");
    const filtered = activeFilter === "all" ? projects : projects.filter(p => p.tech === activeFilter);

    const handleProjectClick = (e, project) => {
        e.preventDefault(); // prevent the link navigation
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setSelectedProject(project);
    };

    const handleBackClick = () => {
        setSelectedProject(null);
    };

    // If a project is selected, show the ProfileProjectPage
    if (selectedProject) {
        return(
        <>
            <div className="content-header-project-page" data-aos="fade-up" data-aos-duration="300">
                <h1>Projects</h1>
                <p>Here are some of the {' '}
                    <span span className="green hover" onMouseEnter={() => setTooltipVisibleProjects(true)} onMouseLeave={() => setTooltipVisibleProjects(false)} onMouseMove={handleMouseMove}><a href="https://github.com/Teu2" target='_blank' className='link'>{"{Projects}"}</a></span> 
                    {' '}
                    i've worked on! go ahead and feel free to check them out, I even made a simple filtering option to make your life easier if you want to browse by a particular 
                    {' '}
                    <span span className="green hover" onMouseEnter={() => setTooltipVisibleCategories(true)} onMouseLeave={() => setTooltipVisibleCategories(false)} onMouseMove={handleMouseMove}><a href="" className='link'>{"{Category}"}</a></span>
                    {' 🙌'}  
                </p>
            </div>
            <ProfileProjectPage project={selectedProject} onBack={handleBackClick} />
        </>);
    }

    return (
        <div className="profile-projects-parent">
            <div className="content">
                {/* intro header */}
                <div className="content-header" data-aos="fade-up" data-aos-duration="300">
                    <h1>Projects</h1>
                    <p>Here are some of the {' '}
                        <span span className="green hover" onMouseEnter={() => setTooltipVisibleProjects(true)} onMouseLeave={() => setTooltipVisibleProjects(false)} onMouseMove={handleMouseMove}><a href="https://github.com/Teu2" target='_blank' className='link'>{"{Projects}"}</a></span> 
                        {' '}
                        i've worked on! go ahead and feel free to check them out, I even made a simple filtering option to make your life easier if you want to browse by a particular 
                        {' '}
                        <span span className="green hover" onMouseEnter={() => setTooltipVisibleCategories(true)} onMouseLeave={() => setTooltipVisibleCategories(false)} onMouseMove={handleMouseMove}><a href="" className='link'>{"{Category}"}</a></span>
                        {' 🙌'}  
                    </p>
                </div>

                {/* tooltips */}
                {tooltipVisibleProjects && (
                    <div className="tooltip" style={{left: tooltipPos.x, top: tooltipPos.y,}}>{handleProjectCount()}</div>
                )}
                {tooltipVisibleCategories && (
                    <div className="tooltip" style={{left: tooltipPos.x, top: tooltipPos.y,}}>{"setActiveFilter(filter.value)"}</div>
                )}
                
                {/* filtering bar */}
                <div className="filter-bar" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                    {filters.map(filter => (
                        <div key={filter.value} onClick={() => setActiveFilter(filter.value)} className={`filter-button ${activeFilter === filter.value ? "active" : ""}`}>
                            {typeof filter.icon === "string" ? <img src={filter.icon} alt="icon" className="skill-icon"/> : filter.icon}
                            {filter.label}
                        </div>
                    ))}
                </div>
                
                {/* project list */}
                <div className="project-list" data-aos="fade-up" data-aos-delay="400" data-aos-duration="300">
                    {filtered.map((project, idx) => (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" key={idx} onClick={(e) => handleProjectClick(e, project)}>
                            <div className="project-card">
                                <div className="title">
                                    <div className="tech-title">
                                            {project.language ? <div className="img-container"><img src={project.language} alt="tech" /></div> : null}
                                            <div className="project-name">
                                                <h4>{project.title}</h4>
                                                {project.inProgress ? <span className="in-progress">In Progress</span> : null}
                                            </div>
                                    </div>
                                    <FiArrowUpRight />
                                </div>
                                <div className="project-image">
                                    {project.img ? <img src={project.img} alt={project.title} /> : <div className="no-image"><p>In Progress</p></div>}
                                </div>
                                <div className="project-desc">
                                    <p>{project.desc}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}