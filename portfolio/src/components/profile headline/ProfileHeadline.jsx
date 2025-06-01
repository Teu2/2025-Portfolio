import { React, useEffect, useState } from 'react';
import "./ProfileHeadline.scss";
import pfpImage from '../../assets/pfp.png';
import greenie from "../../assets/greenie.png";
import { FaMapLocation } from "react-icons/fa6";
import axios from 'axios';

export const ProfileHeadline = () => {

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const cache_key = 'melbourneWeatherCache';
    const cache_ttl = 5 * 60 * 1000;
    const titles = ["Junior Software Engineer.", "Problem Solver.", "Tech Enthusiast."];

    const [displayedText, setDisplayedText] = useState('');
    const [titleIndex, setTitleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);
    const [weather, setWeather] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);

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

    useEffect(() => {
        const getCachedWeather = () => {
            try {
                const raw = localStorage.getItem(cache_key);
                if (!raw) return null;
                const data = JSON.parse(raw);
                if (!data.temp_c || !data.fetchedAt) return null;
                if (Date.now() - data.fetchedAt < cache_ttl) {
                    return data.temp_c;
                } else {
                    return null;
                }
            } catch {
                return null;
            }
        };

        const cacheWeatherValue = (temp) => {
            const payload = {
                temp_c: temp,
                fetchedAt: Date.now(),
            };
            localStorage.setItem(cache_key, JSON.stringify(payload));
        };

        const getWeatherData = async () => {
            const cachedTemp = getCachedWeather();
            if (cachedTemp !== null) {
                console.log("Fetching fresh weather data from cache...");
                setWeather(cachedTemp);
                return;
            }

            try {
                console.log("Fetching fresh weather data from API...");
                const res = await axios.get(
                    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Melbourne`
                );
                const temp = res.data.current.temp_c;
                setWeather(temp);
                cacheWeatherValue(temp);
            } catch (err) {
                console.error("Failed to fetch weather:", err);
                const FAKE_TEMP = 12.6;
                setWeather(FAKE_TEMP);
                setWeatherIcon("☁️");
            }
        };

        getWeatherData();
    }, []);

    return (
        <div className="profile-headline-parent">
            <div className="content">
                {/* picture of me */}
                <div className="left" data-aos="fade-right" data-aos-duration="300">
                    <img src={pfpImage} alt="Example" className='pfp' />
                    <img src={greenie} alt="Example" className='baby-yoda' />
                </div>

                {/* welcome greeting */}
                <div className="right" data-aos="fade-left" data-aos-delay="200" data-aos-duration="300">
                    <h1>Welcome to my <span className='green'>Portfolio</span> <span className='wave'>👋</span></h1>
                    <p>Dominic Yeoh, <span className="typing">{displayedText}</span></p>
                    <div className="location">
                        <FaMapLocation />
                        <p>
                            Melbourne, Victoria, Aus – {weather !== null ? `${weather}°C` : '12.5°C'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
