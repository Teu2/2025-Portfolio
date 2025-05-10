import React, { useState } from 'react';
import './Footer.scss';

export const Footer = () => {
    
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setTooltipPos({ x: e.clientX + 5, y: e.clientY - 40}); // small offset
    };

    return (
        <div className="footer-parent">
        <div className="content">
            <p>©{' '}<span className="green hover" onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)} onMouseMove={handleMouseMove}>{`{${currentYear}}`}</span>{' '}Portfolio. All rights reserved.</p>
            <p>Developed with 💚 by Dominic</p>

            {tooltipVisible && (
                <div className="tooltip" style={{left: tooltipPos.x, top: tooltipPos.y,}}>
                    useState(new Date().getFullYear());
                </div>
            )}
        </div>
        </div>
    );
};