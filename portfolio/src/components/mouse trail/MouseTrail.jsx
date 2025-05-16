import React, { useEffect, useRef, useState } from 'react';
import './MouseTrail.scss';

export const MouseTrail = () => {
    const canvasRef = useRef(null);
    const pointsRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const requestRef = useRef(null);
    const mouseMovedRef = useRef(false);

    // Trail configuration - adjusted for better visibility
    const config = {
        maxPoints: 15,
        trailWidth: 10, // Thicker trail
        springForce: 0.55, // More responsive
        friction: 0.75,
        waviness: 1, // More pronounced wave
        color: '#4ade80', // Bright green
        trailOpacity: 1 // Full opacity
    };

    useEffect(() => {
        console.log("MouseTrail component mounted");
        
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas ref is null");
            return;
        }
        
        const ctx = canvas?.getContext('2d');
        if (!ctx) {
            console.error("Could not get 2d context");
            return;
        }
        
        let lastTime = 0;

        // Initialize canvas size
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            console.log(`Canvas resized to ${canvas.width}x${canvas.height}`);
        };

        // Initialize with points at cursor position
        const initializePoints = (x, y) => {
            pointsRef.current = [];
            for (let i = 0; i < config.maxPoints; i++) {
                pointsRef.current.push({
                    x: x,
                    y: y,
                    vx: 0,
                    vy: 0
                });
            }
        };

        // Track mouse movement
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            
            // Initialize points only on first mouse move
            if (!mouseMovedRef.current) {
                mouseMovedRef.current = true;
                initializePoints(e.clientX, e.clientY);
                console.log("Mouse moved for the first time, initializing trail");
            }
        };

        // Animation loop
        const animate = (currentTime) => {
            const deltaTime = lastTime ? (currentTime - lastTime) / 1000 : 0;
            lastTime = currentTime;
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Skip if mouse hasn't moved yet or no points initialized
            if (!mouseMovedRef.current || pointsRef.current.length === 0) {
                requestRef.current = requestAnimationFrame(animate);
                return;
            }
            
            // Update first point to follow mouse with slight lag
            const firstPoint = pointsRef.current[0];
            firstPoint.vx = (mouseRef.current.x - firstPoint.x) * config.springForce;
            firstPoint.vy = (mouseRef.current.y - firstPoint.y) * config.springForce;
            
            firstPoint.x += firstPoint.vx;
            firstPoint.y += firstPoint.vy;
            
            // Update subsequent points
            for (let i = 1; i < pointsRef.current.length; i++) {
                const currentPoint = pointsRef.current[i];
                const previousPoint = pointsRef.current[i - 1];
                
                // Apply spring force toward previous point
                currentPoint.vx = (previousPoint.x - currentPoint.x) * config.springForce;
                currentPoint.vy = (previousPoint.y - currentPoint.y) * config.springForce;
                
                // Apply friction
                currentPoint.vx *= config.friction;
                currentPoint.vy *= config.friction;
                
                // Update position
                currentPoint.x += currentPoint.vx;
                currentPoint.y += currentPoint.vy;
            }
            
            // Draw the trail
            ctx.beginPath();
            
            // Set up gradient for the trail
            const gradient = ctx.createLinearGradient(
                pointsRef.current[0].x, 
                pointsRef.current[0].y, 
                pointsRef.current[pointsRef.current.length - 1].x, 
                pointsRef.current[pointsRef.current.length - 1].y
            );
            
            gradient.addColorStop(0, config.color);
            gradient.addColorStop(1, `${config.color}80`); // 50% opacity at the end
            
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = config.trailOpacity;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            // Start the path
            ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);
            
            // Draw wavy curve through points
            for (let i = 1; i < pointsRef.current.length - 2; i++) {
                const xc = (pointsRef.current[i].x + pointsRef.current[i + 1].x) / 2;
                const yc = (pointsRef.current[i].y + pointsRef.current[i + 1].y) / 2;
                
                // Add waviness
                const waveFactor = Math.sin(i * 0.15 + currentTime * 0.002) * config.waviness;
                const adjustedY = yc + waveFactor;
                
                // Adjust line width based on position in trail
                const widthFactor = 1 - (i / pointsRef.current.length);
                ctx.lineWidth = config.trailWidth * widthFactor;
                
                ctx.quadraticCurveTo(pointsRef.current[i].x, pointsRef.current[i].y, xc, adjustedY);
            }
            
            // Connect to last points
            const lastIndex = pointsRef.current.length - 1;
            const secondLastIndex = pointsRef.current.length - 2;
            
            if (lastIndex > 0 && secondLastIndex > 0) {
                ctx.quadraticCurveTo(
                    pointsRef.current[secondLastIndex].x,
                    pointsRef.current[secondLastIndex].y,
                    pointsRef.current[lastIndex].x,
                    pointsRef.current[lastIndex].y
                );
            }
            
            ctx.stroke();
            
            requestRef.current = requestAnimationFrame(animate);
        };

        // Set up event listeners and animation
        updateCanvasSize();
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', updateCanvasSize);
        
        requestRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            console.log("MouseTrail component unmounting"); 
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', updateCanvasSize);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="mouse-trail-canvas"
        />
    );
}