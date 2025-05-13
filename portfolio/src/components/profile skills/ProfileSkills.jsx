import React from 'react'
import "./ProfileSkills.scss"

import csharpSvg from "../../assets/tech stack icons/c-sharp.svg"
import jsSvg from "../../assets/tech stack icons/javascript.svg"
import tsSvg from "../../assets/tech stack icons/typescript-icon.svg"
import dotnetSvg from "../../assets/tech stack icons/dotnet.svg"
import reactSvg from "../../assets/tech stack icons/react.svg"
import nodeSvg from "../../assets/tech stack icons/nodejs-icon.svg"
import expressSvg from "../../assets/tech stack icons/express.svg"
import pythonSvg from "../../assets/tech stack icons/python.svg"
import msqlSvg from "../../assets/tech stack icons/mysql.svg"
import psqlSvg from "../../assets/tech stack icons/postgresql.svg"
import mdbSvg from "../../assets/tech stack icons/mongodb-icon.svg"
import poSvg from "../../assets/tech stack icons/postman-icon.svg"
import doSvg from "../../assets/tech stack icons/docker-icon.svg"
import gitSvg from "../../assets/tech stack icons/git-icon.svg"
import ghubSvg2 from "../../assets/tech stack icons/github2.svg"
import figSvg from "../../assets/tech stack icons/figma.svg"
import awsSvg from "../../assets/tech stack icons/aws.svg"
import cssSvg from "../../assets/tech stack icons/css-3.svg"
import npmSvg from "../../assets/tech stack icons/npm-icon.svg"
import scssSvg from "../../assets/tech stack icons/scss.svg"
import tailSvg from "../../assets/tech stack icons/tailwind.svg"

export const ProfileSkills = () => {
    return (
        <div className="profile-skills-parent" data-aos="fade-up" data-aos-delay="600" data-aos-duration="300">
            <div className="content">
                {/* <h4>💻 <span className='hl1'>Console</span>.<span className='hl2'>WriteLine</span>(<span className='hl3'>"Tech Stack"</span>);</h4> */}
                <h4>🚀 My Tech Stack</h4>
                <div className="skills">
                    <div className="skill"><img src={csharpSvg} alt="C#" className="skill-icon"/><p>C#</p></div>
                    <div className="skill"><img src={jsSvg} alt="js" className="skill-icon"/><p>JavaScript</p></div>
                    <div className="skill"><img src={tsSvg} alt="ts" className="skill-icon"/><p>TypeScript</p></div>
                    <div className="skill"><img src={pythonSvg} alt="py" className="skill-icon"/><p>Python</p></div>
                    {/* <div className="skill"><img src={cssSvg} alt="css" className="skill-icon"/><p>CSS</p></div> */}
                    <div className="skill"><img src={dotnetSvg} alt="net" className="skill-icon"/><p>.NET</p></div>
                    {/* <div className="skill"><img src={dotnetSvg} alt="aspnet" className="skill-icon"/><p>ASP.NET</p></div> */}
                    <div className="skill"><img src={reactSvg} alt="react" className="skill-icon"/><p>React</p></div>
                    <div className="skill"><img src={nodeSvg} alt="node" className="skill-icon"/><p>Node</p></div>
                    <div className="skill"><img src={expressSvg} alt="express" className="skill-icon"/><p>Express</p></div>
                    {/* <div className="skill"><img src={msqlSvg} alt="msql" className="skill-icon"/><p>MySQL</p></div> */}
                    <div className="skill"><img src={psqlSvg} alt="psql" className="skill-icon"/><p>PostgreSQL</p></div>
                    <div className="skill"><img src={mdbSvg} alt="mdb" className="skill-icon"/><p>MongoDB</p></div>
                    <div className="skill"><img src={poSvg} alt="po" className="skill-icon"/><p>Postman</p></div>
                    <div className="skill"><img src={doSvg} alt="do" className="skill-icon"/><p>Docker</p></div>
                    {/* <div className="skill"><img src={awsSvg} alt="aws" className="skill-icon"/><p>AWS</p></div> */}
                    <div className="skill"><img src={gitSvg} alt="git" className="skill-icon"/><p>Git</p></div>
                    <div className="skill"><img src={ghubSvg2} alt="ghub" className="skill-icon"/><p>GitHub</p></div>
                    <div className="skill"><img src={npmSvg} alt="ghub" className="skill-icon"/><p>npm</p></div>
                    <div className="skill"><img src={figSvg} alt="fig" className="skill-icon"/><p>Figma</p></div>
                    {/* <div className="skill"><img src={cssSvg} alt="fig" className="skill-icon"/><p>CSS</p></div> */}
                    <div className="skill"><img src={scssSvg} alt="fig" className="skill-icon"/><p>SCSS</p></div>
                    <div className="skill"><img src={tailSvg} alt="fig" className="skill-icon"/><p>Tailwind </p></div>
                </div>
            </div>
        </div>
    )
}
