import {React, useEffect, useState} from 'react'
import "./ProfileHeadline.scss"
import pfpImage from '../../assets/pfp.png'

import babyYoda from "../../assets/baby-yoda.png"
import budew from "../../assets/budew.png"
import turtwig from "../../assets/turtwig.png"
import greenie from "../../assets/greenie.png"

import { IoLocation } from "react-icons/io5";

export const ProfileHeadline = () => {

    const titles = ["Junior Software Engineer.", "Problem Solver.", "Tech Enthusiast."];
    const [displayedText, setDisplayedText] = useState('');
    const [titleIndex, setTitleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const currentTitle = titles[titleIndex];
        
        const type = () => {
            if (isDeleting) {
                setDisplayedText(currentTitle.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
                setTypingSpeed(50);
            } else {
                setDisplayedText(currentTitle.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
                setTypingSpeed(70);
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setTitleIndex((titleIndex + 1) % titles.length);
            }
        };

        const timer = setTimeout(type, typingSpeed);
        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, titleIndex]);

    return (
        <div className="profile-headline-parent">
            <div className="content">
                <div className="left" data-aos="fade-right" data-aos-duration="300">
                    <img src={pfpImage} alt="Example" className='pfp'/>
                    <img src={greenie} alt="Example" className='baby-yoda'/>
                </div>
                <div className="right" data-aos="fade-left" data-aos-delay="200" data-aos-duration="300">
                    <h1>Welcome to my <span className='green'>Portfolio</span> <span className='wave'>👋</span></h1>
                    <p>Dominic Yeoh, <span className="typing">{displayedText}</span></p>
                    <div className="location">
                        <IoLocation/>
                        <p>Melbourne, Victoria, Aus</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
