import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ProfileChatBotAI.scss";
import { RiRobot2Line } from "react-icons/ri";

export const ProfileChatBotAI = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [model, setModel] = useState(null);
    const messagesEndRef = useRef(null);

    const CHATBOT_URI = import.meta.env.VITE_CHATBOT_URI;
    const CHATBOT_URI_HEALTH = import.meta.env.VITE_CHATBOT_HEALTHCHECK_URI;
    const SECRET = import.meta.env.VITE_CHATBOT_SECRET;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // initialize the AI model when chatbot opens
    useEffect(() => {
        const initializeModel = async () => {
            console.log("checking service health...");
            if (isOpen) {
                setIsModelLoading(true);
                try {
                    console.log("1.")
                    const res = await axios.get(CHATBOT_URI_HEALTH, {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "x-chatbot-secret": SECRET
                        }
                    });

                    if (res.status == 200) {
                        setModel(true);
                    }

                    console.log("Backend server awake!");

                    setMessages([
                        {
                            type: "bot",
                            content:
                                "Hello! I'm Dom's AI assistant powered by a real language model! 🤖 Ask me anything about his skills, experience, or projects!",
                            timestamp: new Date(),
                        },
                    ]);
                } catch (error) {
                    console.error("Error loading AI model:", error);
                    setMessages([
                        {
                            type: "bot",
                            content:
                                "Hi there! I'm Dom's assistant. While I'm having trouble loading the full AI model, I can still help answer questions about his portfolio! 💻",
                            timestamp: new Date(),
                        },
                    ]);
                } finally {
                    setIsModelLoading(false);
                }
            }
        };

        if (isOpen && messages.length === 0) {
            initializeModel();
        }
    }, [isOpen, model, isModelLoading, messages.length]);

    // fallback responses for when AI isn"t available
    const getFallbackResponse = (userMessage) => {
        const message = userMessage.toLowerCase().trim();
    };

    // generate AI response
    const generateAIResponse = async (userMessage) => {

        console.log("calling OpenAI GPT3.5 Turbo..")

        try {
            if (!model) {
                console.log("No AI model available, using fallback");
                return getFallbackResponse(userMessage);
            }
            const res = await axios.post(
                CHATBOT_URI,                        
                { message: userMessage },          
                {
                    withCredentials: true,           
                    headers: {
                        "Content-Type": "application/json",
                        "x-chatbot-secret": SECRET
                    }
                }
            );
            return res?.data?.message;
        } catch (error) {
            console.error("Error generating AI response:", error);
            return getFallbackResponse(userMessage);
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isTyping) return;

        const userMessage = {
            type: "user",
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputValue;
        setInputValue("");
        setIsTyping(true);

        try {
            // generate AI response
            const aiResponse = await generateAIResponse(currentInput);

            // simulate a more natural typing delay
            setTimeout(() => {
                const botResponse = {
                    type: "bot",
                    content: aiResponse,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botResponse]);
                setIsTyping(false);
            }, 800 + Math.random() * 1200); // random delay between 0.8-2 seconds

        } catch (error) {
            console.error("Error in handleSendMessage:", error);
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "2-digit"
        });
    };

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
                        <RiRobot2Line />
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
                            <RiRobot2Line />
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
                            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask something..." className="message-input" disabled={isTyping || isModelLoading} />
                            <button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping || isModelLoading} className="send-button">
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};