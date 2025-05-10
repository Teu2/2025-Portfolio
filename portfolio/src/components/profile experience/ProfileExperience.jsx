import React, { useState } from 'react'
import "./ProfileExperience.scss"

export const ProfileExperience = () => {

    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setTooltipPos({ x: e.clientX + 5, y: e.clientY - 40}); // small offset
    };

    return (
        <div className="profile-experience-parent">
            <div className="content">
                <div className="content-header">
                    <h1>Experience</h1>
                    <p>Want to see my {' '}
                        <span span className="green hover" onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)} onMouseMove={handleMouseMove}><a href="https://www.linkedin.com/in/dominic-y-6376b2277/" target='_blank' className='link'>{"{Work History}"}</a></span>
                        {'? '}
                        I got you, I've been very fortunate to work with some amazing 
                        teams and incredible mentors to develop my skills in different areas of development during my 
                        time at these companies! 💪</p>
                </div>

                {tooltipVisible && (
                    <div className="tooltip" style={{left: tooltipPos.x, top: tooltipPos.y,}}>5 Experiences</div>
                )}

                <div className="experience-section">
                    <div className="experience">
                        <div className="green-dot"></div>
                        <div className="left">
                            <h4>Associate Software Consultant</h4>
                            <p>Capgemini Engineering - Melbourne, Victoria, Aus</p>
                            <p>Mar 2025 - Present</p>
                        </div>
                        <div className="right">
                            <div className="skill">Consulting</div>
                            <div className="skill">Mendix</div>
                            <div className="skill">Quintiq</div>
                            <div className="skill">Python</div>
                        </div>
                    </div>
                    <div className="experience">
                        <div className="green-dot"></div>
                        <div className="left">
                            <h4>Junior PC Builder</h4>
                            <p>Scorptec Computers - Melbourne, Victoria, Aus</p>
                            <p>Oct 2024 - Mar 2025</p>
                        </div>
                        <div className="right">
                            <div className="skill">Quality Control</div>
                            <div className="skill">Troubleshooting</div>
                            <div className="skill">Computer Building</div>
                            <div className="skill">Imaging</div>
                            <div className="skill">Software</div>
                            <div className="skill">Bios Updates</div>
                        </div>
                    </div>
                    <div className="experience">
                        <div className="green-dot"></div>
                        <div className="left">
                            <h4>Full-Stack Engineering IoT Intern</h4>
                            <p>Ellenex - Melbourne, Victoria, Aus</p>
                            <p>Feb 2024 - May 2024</p>
                        </div>
                        <div className="right">
                            <div className="skill">Golang</div>
                            <div className="skill">TypeScript</div>
                            <div className="skill">Angular</div>
                            <div className="skill">AWS Lambda</div>
                            <div className="skill">DynamoDB</div>
                            <div className="skill">MQTT</div>
                            <div className="skill">CI/CD</div>
                            <div className="skill">BitBucket</div>
                            <div className="skill">Unit Testing</div>
                            <div className="skill">TDD</div>
                            <div className="skill">Automated Testing</div>
                            <div className="skill">SCSS</div>
                            <div className="skill">CSS</div>
                            <div className="skill">Agile</div>
                        </div>
                    </div>
                    <div className="experience">
                        <div className="green-dot"></div>
                        <div className="left">
                            <h4>.NET Developer Intern</h4>
                            <p>BRYK Group - Melbourne, Victoria, Aus</p>
                            <p>May 2023 - Sep 2023</p>
                        </div>
                        <div className="right">
                            <div className="skill">C#</div>
                            <div className="skill">.NET</div>
                            <div className="skill">MVVC</div>
                            <div className="skill">Oracle</div>
                            <div className="skill">WPF</div>
                            <div className="skill">xUnit</div>
                            <div className="skill">Unit Testing</div>
                            <div className="skill">Consulting</div>
                            <div className="skill">Agile</div>
                            <div className="skill">OOP</div>
                        </div>
                    </div>
                    <div className="experience last">
                        <div className="green-dot"></div>
                        <div className="left">
                            <h4>Student Software Engineer</h4>
                            <p>Deakin University - Melbourne, Victoria, Aus</p>
                            <p>Mar 2022 - Nov 2022</p>
                        </div>
                        <div className="right">
                           <div className="skill">HTML5</div>
                           <div className="skill">CSS</div>
                           <div className="skill">MySQL</div>
                           <div className="skill">PHP</div>
                           <div className="skill">JavaScript</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
