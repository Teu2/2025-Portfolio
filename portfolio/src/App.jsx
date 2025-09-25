import { useState, useEffect, createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./App.scss";

// components
import { Navbar } from "./components/navbar/Navbar.jsx";
import { ProfileHeadline } from "./components/profile headline/ProfileHeadline.jsx";
import { ProfileAbout } from "./components/profile about/ProfileAbout.jsx";
import { ProfileSkills } from "./components/profile skills/ProfileSkills.jsx";
import { ProfileServices } from "./components/profile services/ProfileServices.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { ProfileExperience } from "./components/profile experience/ProfileExperience.jsx";
import { ProfileProjects } from "./components/profile projects/ProfileProjects.jsx";
import { ProfileContact } from "./components/profile contact/ProfileContact.jsx";
import { MouseTrail } from "./components/mouse trail/MouseTrail.jsx";
import { ProfileChatBotAI } from "./components/profile chatbot ai/ProfileChatBotAI.jsx";
import { Spotify } from "./components/spotify/Spotify.jsx";
import { GithubContributions } from "./components/github contributions/GithubContributions.jsx";
import { ProfileGuestBook } from "./components/profile guestbook/ProfileGuestBook.jsx";

// Fixed import path for your Meteors component
import { Particles } from "./components/magicui/Particles";

const Layout = ({ children }) => {
    return (
        <>
            {/* <Particles /> */}
            {/* <MouseTrail /> */}
            {children}
            {/* <ProfileChatBot /> */}
            <ProfileChatBotAI />
        </>
    );
};

function App() {
    AOS.init();

    useEffect(() => {
        // getWeatherData();
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Layout>
                    <div className="app-container">
                        <Navbar />
                        <div className="content">
                            <ProfileHeadline/>
                            <ProfileAbout />
                            <ProfileSkills />
                            <ProfileServices />
                            <Spotify />
                            {/* <GithubContributions /> */}
                        </div>
                        <Footer />
                    </div>
                </Layout>
            )
        },
        {
            path: "/experience",
            element: (
                <Layout>
                    <div className="app-container">
                        <Navbar />
                        <div className="content">
                            <ProfileExperience />
                        </div>
                        <Footer />
                    </div>
                </Layout>
            )
        },
        {
            path: "/projects",
            element: (
                <Layout>
                    <div className="app-container">
                        <Navbar />
                        <div className="content">
                            <ProfileProjects />
                            {/* <GithubContributions /> */}
                        </div>
                        <Footer />
                    </div>
                </Layout>
            )
        },
        {
            path: "/contact",
            element: (
                <Layout>
                    <div className="app-container">
                        <Navbar />
                        <div className="content">
                            <ProfileContact />
                        </div>
                        <Footer />
                    </div>
                </Layout>
            )
        },
        {
            path: "/guestbook",
            element: (
                <Layout>
                    <div className="app-container">
                        <Navbar />
                        <div className="content">
                            <ProfileGuestBook />
                        </div>
                        <Footer />
                    </div>
                </Layout>
            )
        },
    ])

    return (
        <div className="app-parent">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;