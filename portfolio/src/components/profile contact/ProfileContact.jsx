import React from 'react'
import "./ProfileContact.scss"

// icons
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

export const ProfileContact = () => {
    return (
        <div className="profile-contact-parent">
            <div className="content">
                <h1>Contact me</h1>
                <p>If you have any questions or would like to discuss a project, please feel free to reach out!</p>
                <div className="social-links">
                    <FaGithub />
                    <FaLinkedin />
                </div>
            </div>
        </div>
    )
}
