import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import "./ProfileContact.scss"

// icons
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";

export const ProfileContact = () => {

    // email stuffs
    const form = useRef();
    const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
    const RATE_LIMIT_SECONDS = 60;

    const showToast = (message, type = 'success') => {
        setToast({ visible: true, message, type });
        setTimeout(() => {
            setToast({ visible: false, message: '', type: 'success' });
        }, 3000);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        console.log("Sending email...");

        const lastSent = localStorage.getItem("lastMessageTime");
        const now = Date.now();

        if (lastSent && now - lastSent < RATE_LIMIT_SECONDS * 1000) {
            showToast(`Please wait ${RATE_LIMIT_SECONDS} seconds my inbox has feeling too...`, 'error');
            return;
        }

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(() => {
            console.log("1");
            showToast('Email sent successfully! ', 'success');
            form.current.reset();
            localStorage.setItem("lastMessageTime", now);
        }, () => {
            console.log("2");
            showToast(`Email failed to send.`, 'error');
        });
    };

    return (
        <div className="profile-contact-parent">
            {/* intro header */}
            <div className="content" data-aos="fade-left" data-aos-duration="300">
                <h1>Contact me</h1>
                <p>If you have any questions or if you'd like to discuss a project, please feel free to reach out! 🫶</p>
            </div>

            {/* form section */}
            <div className="form" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                <form ref={form} onSubmit={sendEmail} className="contact-form">
                    <input type="text" name="user_name" placeholder="Your Name" required />
                    <input type="email" name="user_email" placeholder="Your Email" required />
                    <textarea name="message" placeholder="Your Message" rows="15" required />
                    <button type="submit">Send Message</button>
                </form>
            </div>

            {/* socials */}
            <div className="social-links" data-aos="fade-up" data-aos-delay="400" data-aos-duration="300">
                <FaGithub />
                <FaLinkedin />
                <a href="https://docs.google.com/document/d/166OcttudOVXttP_xZkmQsdDz1T79xYyUgCw3zb3Op0g/edit?usp=sharing" target='_blank' className='about-link'><LuDownload /> {"Resume"}</a>
            </div>
            
            {/* custom toast */}
            {toast.visible && (
                <div className={`toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}
        </div>
    )
}
