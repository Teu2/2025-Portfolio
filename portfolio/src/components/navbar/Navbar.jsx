import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "./Navbar.scss";

import { FaHome } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import { FaFolderOpen } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { FaSpotify } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { FiSun } from "react-icons/fi";
import { RiGithubLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="left">
                <Link to="/"><FaHouse/><p>Home</p></Link>
                <Link to="/experience"><FaBriefcase/><p>Experience</p></Link>
                <Link to="/projects"><FaFolderClosed/><p>Projects</p></Link>
                {/* <Link to="/listening"><FaSpotify/><p>Spotify</p></Link> */}
                <Link to="/contact"><FaEnvelope/><p>Contact</p></Link>
            </div>
            <div className="right">
                <a href=""><FiSun/></a>
                <a href="https://github.com/Teu2" target='_blank'><RiGithubLine/></a>
                <a href="https://www.linkedin.com/in/domklcy/" target='_blank'><FaLinkedin/></a>
            </div>
        </div>
    )
};
