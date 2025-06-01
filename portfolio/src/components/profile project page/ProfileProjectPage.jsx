import React from 'react'
import "./ProfileProjectPage.scss"
import { FaArrowLeft } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";

export const ProfileProjectPage = ({ project, onBack }) => {

    const convertToUpperCase = (str) =>{
        return str.toUpperCase();
    }

    return (
        <div className="profile-project-page-parent" data-aos="fade-left" data-aos-delay="200" data-aos-duration="300">
            <div className="content">
                {/* back button */}
                <div className="back-button">
                    <button onClick={onBack}><FaArrowLeft/> <span className='btn'>Back</span></button>
                </div>
                
                {/* project details */}
                <div className="project-detail-container">
                    <div className="project-header">
                        <div className="title">
                            {project.language ? <img src={project.language} alt="tech" /> : null}
                            <h3>{project.title}</h3>
                        </div>
                        <p className='tech'>{convertToUpperCase(project.tech)}</p>
                    </div>

                    {/* project image */}
                    <div className="project-image-showcase">
                        {project.img ? <img src={project.img} alt={project.title} /> : <div className="no-image-placeholder"><p>Project In Progress</p></div>}
                    </div>

                    {/* project about section */}
                    <div className="demo-about-stack">
                        <div className="demo">
                            <div className="left">
                                <p className='left-title'>Demo & Code</p>
                                <p>Feel free to check out the live demo and source code!</p>
                            </div>
                            <div className="right">
                                {project.demo ? 
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className='demo-link'><FiExternalLink /> Demo</a> 
                                    : 
                                    null
                                }
                                {project.github ? 
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className='demo-link'><FaGithub /> Code</a> 
                                    : 
                                    null
                                }
                            </div>
                        </div>
                        
                        {/* about */}
                        <div className="about">
                            <h5>💻 PROJECT</h5>
                            <p>{project.descExt}</p>
                        </div>
                        
                        {/* stack */}
                        <div className="stack">
                            <div className="stack-list">
                                {project.techStack.map((tool, i) => (
                                    <div className="tool">{tool}</div>
                                ))}
                            </div>
                        </div>

                        <div className="seperator"></div>

                        {/* features */}
                        <div className="project-features">
                            <h5>📗 KEY FEATURES</h5>
                            <div className="features">
                                {project.features && project.features.length > 0 ? (
                                    project.features.map((feature, index) => (
                                        <div className="feature" key={index}>
                                            <p>• {feature}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No specific features for this project yet... Come back soon!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}