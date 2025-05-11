import React, { useState } from 'react'
import "./ProfileAbout.scss"
import { LuCopy } from "react-icons/lu";

export const ProfileAbout = () => {

    const [copied, setCopied] = useState(false);
    const [tooltipVisibleLinkedIn, setTooltipVisibleLinkedIn] = useState(false);
    const [tooltipVisibleGitHub, setTooltipVisibleLGitHub] = useState(false);
    const [tooltipVisibleCV, setTooltipVisibleCV] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const handleCopy = () => {
        navigator.clipboard.writeText("domkldev@gmail.com").then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        })
    }

    const handleMouseMove = (e) => {
        // setTooltipPos({ x: e.clientX + 5, y: e.clientY - 40}); // small offset without AOS
        setTooltipPos({ x: e.clientX - 585, y: e.clientY - 330}); // small offset with AOS
    };
    
    return (
        <div className="profile-about-parent" data-aos="fade-up" data-aos-delay="400" data-aos-duration="400">
            <div className="content">
                {/* <h4>💻<span className='hl1'> Console</span>.<span className='hl2'>WriteLine</span>(<span className='hl3'>"About Me"</span>);</h4> */}
                <div className="about-links">
                    <div className={copied ? "about-copied" : "about-link"} onClick={handleCopy}><LuCopy /> {copied ? "Copied!" : "Email"}</div>
                </div>

                <p>I'm a Junior Software Engineer with a love for creating innovative software solutions using .NET, Python, and JavaScript!
                    I love programming, enjoy learning new technologies, video editing, and boxing! — basically, I spend most of my time in front of a screen, and occasionaly get punched in the face.</p>
                    <div className="hobbies">
                        <p>My other hobbies include:</p>
                        <div className="hobby">
                            <p>PC Building</p>
                            <p>Gaming</p>
                            <p>Fitness</p>
                            <p>Homelabs</p>
                            <p>Daydreaming</p>
                        </div>
                    </div>

                <p>
                    Feel free to connect with me on {' '}
                    <span span className="green hover" onMouseEnter={() => setTooltipVisibleLinkedIn(true)} onMouseLeave={() => setTooltipVisibleLinkedIn(false)} onMouseMove={handleMouseMove}><a href="https://www.linkedin.com/in/dominic-y-6376b2277/" target='_blank' className='link'>{"{LinkedIn}"}</a></span>
                    {' '} or {' '}
                    <span span className="green hover" onMouseEnter={() => setTooltipVisibleLGitHub(true)} onMouseLeave={() => setTooltipVisibleLGitHub(false)} onMouseMove={handleMouseMove}><a href="https://github.com/Teu2" target='_blank' className='link'>{"{GitHub}"}</a></span>
                    {', '} or just download my {' '}
                    <span span className="green hover" onMouseEnter={() => setTooltipVisibleCV(true)} onMouseLeave={() => setTooltipVisibleCV(false)} onMouseMove={handleMouseMove}><a href="https://github.com/Teu2" target='_blank' className='link'>{"{Resume}"}</a></span>
                </p>

                {/* tool tips */}
                {tooltipVisibleLinkedIn && (
                    <div className="tooltip" style={{left: tooltipPos.x, top: tooltipPos.y,}}>46 Connections</div>
                )}

                {tooltipVisibleGitHub && (
                    <div className="tooltip" style={{left: tooltipPos.x, top: tooltipPos.y,}}>5 Stars</div>
                )}

                {tooltipVisibleCV && (
                    <div className="tooltip" style={{left: tooltipPos.x, top: tooltipPos.y,}}>2025 Resume PDF</div>
                )}
            </div>
        </div>
    )
}
