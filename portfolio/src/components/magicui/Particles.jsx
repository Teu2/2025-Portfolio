import React, { useEffect, useState, useRef } from "react";
import "./Particles.scss";

export const Particles = ({
	number = 20,
	minSize = 2,
	maxSize = 5,
	minOpacity = 0.4,
	maxOpacity = 0.8,
	minDuration = 8,
	maxDuration = 16,
	className = "",
	mouseInfluence = 0.3, // How much the mouse affects particles (0-1)
}) => {
	const [styles, setStyles] = useState([]);
	const particlesRef = useRef([]);

	useEffect(() => {
		const generate = () => {
			const arr = Array.from({ length: number }).map(() => {
				const size = Math.random() * (maxSize - minSize) + minSize;
				const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
				const duration =
					Math.random() * (maxDuration - minDuration) + minDuration;
				const glowDuration = duration * 0.5;
				const delay = Math.random() * duration * -1;
				const driftX = (Math.random() - 0.5) * 300;
				const driftY = (Math.random() - 0.5) * 300;
				const baseX = Math.random() * 100;
				const baseY = Math.random() * 100;

				// Store base positions for mouse interaction calculations
				const particleData = {
					baseX,
					baseY,
					size,
					// Different particles react with different sensitivity
					sensitivity: 0.5 + Math.random() * 0.5, // 0.5 to 1.0
				};

				return {
					...particleData,
					"--size": `${size}px`,
					"--opacity": opacity,
					"--duration": `${duration}s`,
					"--glow-duration": `${glowDuration}s`,
					"--delay": `${delay}s`,
					"--drift-x": `${driftX}px`,
					"--drift-y": `${driftY}px`,
					"--mouse-x": "0px",
					"--mouse-y": "0px",
					top: `${baseY}%`,
					left: `${baseX}%`,
				};
			});
			setStyles(arr);
			particlesRef.current = arr;
		};

		generate();
	}, [
		number,
		minSize,
		maxSize,
		minOpacity,
		maxOpacity,
		minDuration,
		maxDuration,
	]);

	useEffect(() => {
		const handleMouseMove = (e) => {
			// Use window dimensions instead of container
			const x = (e.clientX / window.innerWidth) * 100; // 0-100%
			const y = (e.clientY / window.innerHeight) * 100; // 0-100%

			// Update particle positions based on mouse
			const updatedStyles = particlesRef.current.map((particle) => {
				// Calculate distance from mouse to particle
				const deltaX = x - particle.baseX;
				const deltaY = y - particle.baseY;
				
				// Apply mouse influence with particle sensitivity (negative for repelling effect)
				const mouseOffsetX = -deltaX * mouseInfluence * particle.sensitivity;
				const mouseOffsetY = -deltaY * mouseInfluence * particle.sensitivity;

				return {
					...particle,
					"--mouse-x": `${mouseOffsetX}px`,
					"--mouse-y": `${mouseOffsetY}px`,
				};
			});

			setStyles(updatedStyles);
		};

		// Add event listener to document instead of container
		document.addEventListener("mousemove", handleMouseMove);
		
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, [mouseInfluence]);

	return (
		<div className={`particles-container ${className}`}>
			{styles.map((s, i) => (
				<span key={i} className="particle" style={s} />
			))}
		</div>
	);
};