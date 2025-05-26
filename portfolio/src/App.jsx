import { useState, useEffect, createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
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
import { ProfileSpotify } from "./components/profile spotify/ProfileSpotify.jsx";
import { MouseTrail } from "./components/mouse trail/MouseTrail.jsx";
import { ProfileChatBot } from "./components/profile chatbot/ProfileChatBot.jsx";
import { ProfileChatBotAI } from "./components/profile chatbot ai/ProfileChatBotAI.jsx";

// Create a Layout component that includes MouseTrail
const Layout = ({ children }) => {
    return (
        <>
            {/* <MouseTrail /> */}
            {children}
            {/* <ProfileChatBot /> */}
            <ProfileChatBotAI />
        </>
    );
};

function App() {
    
    AOS.init();
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Layout>
                    <div className="app-container">
                        <Navbar />
                        <div className="content">
                            <ProfileHeadline />
                            <ProfileAbout />
                            <ProfileSkills />
                            <ProfileServices />
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
                        </div>
                        <Footer />
                    </div>
                </Layout>
            )
        },
        {
            path: "/listening",
            element: (
                <Layout>
                    <div className="app-container">
                        <Navbar />
                        <div className="content">
                            <ProfileSpotify />
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
    ])

    return (
        <div className="app-parent">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;