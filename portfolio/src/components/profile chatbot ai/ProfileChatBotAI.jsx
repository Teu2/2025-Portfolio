import React, { useState, useRef, useEffect } from 'react';
import './ProfileChatBotAI.scss';
import { RiRobot2Line } from "react-icons/ri";

export const ProfileChatBotAI = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState(null);
    const messagesEndRef = useRef(null);

    const portfolioContext = `You are a helpful assistant for Dominic Yeoh's portfolio website. 

Dominic Yeoh is a Junior Software Engineer based in Melbourne, Victoria, Australia. Here's what you should know about him:

SKILLS & TECHNOLOGIES:
- Languages: C#, JavaScript, TypeScript, Python
- Frontend: React, HTML, CSS, SCSS
- Backend: .NET, Node.js, Express
- Databases: PostgreSQL, SQL
- Tools: Docker, AWS, Git, GitHub, Figma, Postman
- Other: RESTful APIs, Full-stack development

EXPERIENCE:
- Junior Software Engineer with experience in full-stack development
- Worked on web applications, APIs, and database design
- Experience with both frontend and backend technologies

PROJECTS:
- Has built various web applications and full-stack solutions
- Game development projects including "Rapid Rage Fight" and "Glowing Under"
- Portfolio website showcasing technical skills

HOBBIES:
- PC Building, Gaming, Fitness, Homelabs, Daydreaming
- Passionate about learning new technologies
- Enjoys both playing and creating games

CONTACT & LOCATION:
- Based in Melbourne, Victoria, Australia
- Open to both local and remote opportunities
- Available on LinkedIn, GitHub, and email
- Resume available for download

Keep responses concise, friendly, and relevant to potential employers or collaborators viewing his portfolio.`;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // initialize the AI model when chatbot opens
    useEffect(() => {
        const initializeModel = async () => {
            if (isOpen && !model && !isModelLoading) {
                setIsModelLoading(true);
                try {
                    console.log("Initializing AI model...");

                    const { pipeline, env } = await import('@xenova/transformers');

                    env.allowRemoteModels = true;
                    env.useBrowserCache = true;

                    const generator = await pipeline(
                        'text2text-generation',
                        'Xenova/t5-small',
                        {
                            quantized: true,
                            progress_callback: (p) =>
                                console.log('Model loading progress:', p),
                        }
                    );

                    setModel(generator);
                    console.log("✅ Model loaded!");

                    setMessages([
                        {
                            type: 'bot',
                            content:
                                "Hello! I'm Dom's AI assistant powered by a real language model 🤖. Ask me anything about his skills, experience, or projects!",
                            timestamp: new Date(),
                        },
                    ]);
                } catch (error) {
                    console.error('Error loading AI model:', error);
                    setMessages([
                        {
                            type: 'bot',
                            content:
                                "Hi there! I'm Dom's assistant. While I'm having trouble loading the full AI model, I can still help answer questions about his portfolio! 💻",
                            timestamp: new Date(),
                        },
                    ]);
                }
                setIsModelLoading(false);
            }
        };

        if (isOpen && messages.length === 0) {
            initializeModel();
        }
    }, [isOpen, model, isModelLoading, messages.length]);

    // fallback responses for when AI isn't available
    const getFallbackResponse = (userMessage) => {
        const message = userMessage.toLowerCase().trim();

        if (message.includes('skill') || message.includes('technology') || message.includes('tech stack') || message.includes('tools')) {
            return "Dominic is proficient in .NET, Python, JavaScript, C#, TypeScript, React, Node.js, and many other technologies! He also works with databases like PostgreSQL, uses tools like Docker and AWS, and has experience with Git. You can see his full tech stack on the homepage! 💻";
        }

        if (message.includes('experience') || message.includes('work') || message.includes('job')) {
            return "Dominic is a Junior Software Engineer with experience in full-stack development. He's worked on various projects involving web applications, APIs, and database design. Check out the Experience section for detailed information! 🚀";
        }

        if (message.includes('project') || message.includes('portfolio') || message.includes('build') || message.includes('made')) {
            return "Dominic has built several exciting projects including a text to image translator, an API for narrative and world building, and a full stack social media app! Visit the Projects section to see his work! 🎮";
        }

        if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('linkedin')) {
            return "You can connect with Dominic through LinkedIn, GitHub, or email! All his contact information is available in the Contact section, or at the right side of the navbar. He's always open to discussing new opportunities! 📧";
        }

        if (message.includes('location') || message.includes('where') || message.includes('melbourne') || message.includes('australia')) {
            return "Dominic is based in Melbourne, Victoria, Australia! He's open to both local and remote opportunities. 🇦🇺";
        }

        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! want to know something? 😊";
        }

        return "That's an interesting question! I can tell you about Dominic's skills, experience, projects, or how to contact him. What would you like to know more about? 🤔";
    };

    // generate AI response
    const generateAIResponse = async (userMessage) => {
        if (!model) {
            console.log('No AI model available, using fallback');
            return getFallbackResponse(userMessage);
        }

        try {
            const prompt = `You are Dominic Yeoh's portfolio assistant. He is a Junior Software Engineer from Melbourne. Answer briefly and clearly:\n${userMessage}`;

            const result = await model(prompt);

            let response = result[0].generated_text.trim();
            console.log('AI response:', response);

            if (response.length < 10 || response.includes('undefined')) {
                return getFallbackResponse(userMessage);
            }

            return response;
        } catch (error) {
            console.error('Error generating AI response:', error);
            return getFallbackResponse(userMessage);
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isTyping) return;

        const userMessage = {
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputValue;
        setInputValue('');
        setIsTyping(true);

        try {
            // generate AI response
            const aiResponse = await generateAIResponse(currentInput);

            // simulate a more natural typing delay
            setTimeout(() => {
                const botResponse = {
                    type: 'bot',
                    content: aiResponse,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botResponse]);
                setIsTyping(false);
            }, 800 + Math.random() * 1200); // random delay between 0.8-2 seconds

        } catch (error) {
            console.error('Error in handleSendMessage:', error);
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    // SVG Icons
    const ChatIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    );

    const ExpandIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,3 21,3 21,9"></polyline>
            <polyline points="9,21 3,21 3,15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
        </svg>
    );

    const SendIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
        </svg>
    );

    return (
        <div className="chatbot-container">
            {/* collapsed Header Bar */}
            {!isOpen && (
                <div className="chatbot-collapsed" onClick={() => setIsOpen(true)}>
                    <div className="collapsed-content">
                        <RiRobot2Line   />
                        <div className="status-dot"></div>
                        <span className="collapsed-title">Chat with Dom Support</span>
                    </div>
                    <button className="expand-button">
                        <ExpandIcon />
                    </button>
                </div>
            )}

            {/* full Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    {/* header */}
                    <div className="chatbot-header" onClick={() => setIsOpen(false)}>
                        <div className="header-content">
                            <RiRobot2Line   />
                            <div className="status-dot"></div>
                            <span className="header-title">Chat with Dom Support</span>
                        </div>
                        <button className="collapse-button">
                            <ExpandIcon />
                        </button>
                    </div>

                    {/* messages */}
                    <div className="messages-container">
                        {isModelLoading && (
                            <div className="loading-message">
                                <div className="loading-spinner"></div>
                                <p>Loading AI model...</p>
                            </div>
                        )}

                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.type}`}>
                                <div className="message-bubble">
                                    <p className="message-content">{message.content}</p>
                                    <p className="message-time">
                                        {formatTime(message.timestamp)}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* typing indicator */}
                        {isTyping && (
                            <div className="message bot">
                                <div className="message-bubble">
                                    <div className="typing-indicator">
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* input */}
                    <div className="input-container">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask something..."
                                className="message-input"
                                disabled={isTyping || isModelLoading}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isTyping || isModelLoading}
                                className="send-button"
                            >
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};