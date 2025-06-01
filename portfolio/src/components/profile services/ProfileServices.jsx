import React from 'react'
import "./ProfileServices.scss"

import { FiMonitor } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { TbServerCog } from "react-icons/tb";
import { FaMicrochip } from "react-icons/fa6";
import { HiChip } from "react-icons/hi";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

export const ProfileServices = () => {
    return (
        <div className="profile-services-parent" data-aos="fade-up" data-aos-delay="800" data-aos-duration="300">
            <div className="content">
                <div className="card-grid">
                    <div className="card">
                        <div className="left">
                            <div className="icon green"><FiMonitor/></div>
                        </div>
                        <div className="right">
                            <h4>Front-End</h4>
                            <p>I develop responsive interfaces and bring designs to life with modern web technologies.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="left">
                            <div className="icon green"><TbServerCog/></div>
                        </div>
                        <div className="right">
                            <h4>Back-End</h4>
                            <p>I build robust server-side logic, APIs, and databases to power scalable and secure applications.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="left">
                            <div className="icon green"><HiChatBubbleLeftRight /></div>
                        </div>
                        <div className="right">
                            <h4>Consulting</h4>
                            <p>I deliver expert advice and tailored solutions to solve real-world technology problems for clients.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="left">
                            <div className="icon green"><HiChip /></div>
                        </div>
                        <div className="right">
                            <h4>IoT Programming</h4>
                            <p>I program connected systems that integrate hardware and software efficiently using Go and MQTT.</p>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    )
}
