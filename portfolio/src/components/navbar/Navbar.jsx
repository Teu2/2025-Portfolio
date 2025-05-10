import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "./Navbar.scss";

import { FaHome } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { FaSpotify } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="left">
                <Link to="/"><FaHome/><p>Home</p></Link>
                <Link to="/experience"><FaBriefcase/><p>Experience</p></Link>
                <Link to="/projects"><FaFolderOpen/><p>Projects</p></Link>
                <Link to="/listening"><FaSpotify/><p>Spotify</p></Link>
                <Link to="/contact"><FaEnvelope/><p>Contact</p></Link>
            </div>
            <div className="right">
                <Link to="/"><FiSun/></Link>
            </div>
        </div>
    )
};
