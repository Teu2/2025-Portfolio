import React, { useState, useRef, useEffect } from 'react';
import './ProfileChatBot.scss';
import { GoDependabot } from "react-icons/go";

export const ProfileChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: "Hello! Feel free to ask me about my experience, skills, projects! or hobbies~ 👋",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // Predefined responses based on common portfolio questions
    const getResponse = (userMessage) => {
        const message = userMessage.toLowerCase().trim();

        if (message.includes('what')) {
            if (message.includes('hobbies')) return "My hobbies? I like programming, building pc's, gaming, boxing and fitness!"
            if (message.includes('hobby')) return "My hobbies? I like programming, building pc's, gaming, boxing and fitness!"
            if (message.includes('rank')) {
                if (message.includes('valorant', 'val')) return "I'm currently plat 3, i'm hardstuck because of my internet... NOT because i'm bad I swear.."
                if (message.includes('league', 'lol')) return "I don't play league because why would I do that..."
            }
            if (message.includes('game')){
                if (message.includes('do you play', 'u play')) return "I play Elden Ring, Skyrim, Oblivion, VALORANT, FFIX, Minecraft, anything really"
                if (message.includes('favourite', 'favorite')) return "My favourite... of ALL time??.. that's tough, but it probably has to be Elden Ring. FromSoftware is just a cut above the rest!"
            }
            if (message.includes('bench')) return "My max bench was 110 kg at 73 kg body weight"
            if (message.includes('lift')) return "My one rep maxes are: 110kg bench, 60kg overhead barbell press, 120kg squat, 120kg deadlift (I don't have enough plates to go over 120kg haha)"
            if (message.includes('specs')) return "Ooooh glad you asked, my PC specs are "
            if (message.includes('projects')) return "I've worked on a lot of projects! check out my projection section to see them :3"
            if (message.includes('favourite') || message.includes('favorite') || message.includes('fav')){
                if (message.includes('project')) return "my favourite project? hmm.. probably the Link social media appliction i'm currently developing!"
                if (message.includes('game')) return "My favourite... of ALL time??.. that's tough, but it probably has to be Elden Ring. FromSoftware is just a cut above the rest!"
                if (message.includes('language')) return "my favourite programming language... hm... probably JavaScript? vanilla answer I know, don't hate the player hate the game"
                if (message.includes('food')) return "I really like sinigang! it's sour and savory soup or stew from the philippines!"
            }
            if (message.includes('learning')){
                return "I'm currently learning python, typescript and Mendix!"
            }
            if (message.includes('mendix')){
                return "Mendix is a low code platform, similar to wix but better and more intuitive!"
            }
            if (message.includes('language')){
                if (message.includes('programming')) return "I'm familiar with C#, Python, JavaScript and TypeScript :3"
                if (message.includes('work')) return "I work with C#, Python, JavaScript and TypeScript :3"
            }
            
        }

        if (message.includes('how')) {
            if (message.includes('boxing')) return "I've been boxing for 6 months now? I go 3 days a week! and spar every Friday"
            if (message.includes('box')) return "I've been boxing for 6 months now? I go 3 days a week! and spar every Friday"
            if (message.includes('gym')) return "I started going to the gym around 2022-ish?"
            if (message.includes('working out')) return "I started working out around 2022-ish?"
        }

        if (message.includes('why')) {
            if (message.includes('boxing?')) return "I just enjoy the sport, there's a certain finesse to it and it's also extremely technical! it also really builds a persons discipline"
            if (message.includes('box')) return "I just enjoy the sport, there's a certain finesse to it and it's also extremely technical! it also really builds a persons discipline"
            if (message.includes('software engineering')) return "I like programming and making things, and i'm pretty good at it too, I guess that's why haha"
            if (message.includes('software engineer')) return "I like programming and making things, and i'm pretty good at it too, I guess that's why haha"
            if (message.includes('developer')) return "I like programming and making things, and i'm pretty good at it too, I guess that's why haha"
            if (message.includes('programming')) return "I like making things, and i'm pretty good at it too, I guess that's why haha"
            if (message.includes('code')) return "I like the idea of making my own applications for any purpose, the freedom is what gets me :)"
            if (message.includes('coder')) return "I like the idea of making my own applications for any purpose, the freedom is what gets me :)"
            if (message.includes('coding')) return "I like the idea of making my own applications for any purpose, the freedom is what gets me :)"
        }

        if (message.includes('where')) {
            if (message.includes('do you train', 'do u train')) return "I train at Big Ben's Boxing in Melbourne!"
            if (message.includes('do you box', 'do u box')) return "I box at Big Ben's Boxing in Melbourne!"
            if (message.includes('do you do boxing')) return "I've been boxing for 6 months now? I go 3 days a week! and spar every Friday"
            if (message.includes('do you live', 'address')) return "I'm located in Melbourne Australia"
            if (message.includes('did you grow up')) return "I've been boxing for 6 months now? I go 3 days a week! and spar every Friday"
        }

        if (message.includes('do')) {
            if (message.includes('like') || message.includes('enjoy')){
                if (message.includes('boxing')) return "I do enjoy boxing! it keeps me fit, disciplined and teaches you how to defend yourself!"
            }
            if (message.includes('boxing')) return "I've been boxing for 6 months now? I go 3 days a week! and spar every Friday"
            if (message.includes('box')) return "I've been boxing for 6 months now? I go 3 days a week! and spar every Friday"
            if (message.includes('gym')) return "I do! I try to go to them gym regularly!"
            if (message.includes('workout')) return "I do! I try to workout regularly!"
        }

        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            const greetings = [
                "Hi there! 👋", "Hello, what do you want to talk about? 😊", "Hello! want to know something?", "Hi! hope you're doing well! what would you like to talk about?", "Hello!"
            ]
            const rand = Math.floor(Math.random() * greetings.length);
            return greetings[rand];
        }
        
        return unrecognizedQueries(userMessage)
        
    };

    const unrecognizedQueries = (userMessage) => {
        return `Umm... 🤔 sorry, what do you mean by '${userMessage}'`;
    }

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
        type: 'user', 
        content: inputValue,
        timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
        const botResponse = {
            type: 'bot',
            content: getResponse(inputValue),
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
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
  const MessageIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
    </svg>
  );

  const MinimizeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="4,14 10,14 10,20"></polyline>
        <polyline points="20,10 14,10 14,4"></polyline>
        <line x1="14" y1="10" x2="21" y2="3"></line>
        <line x1="3" y1="21" x2="10" y2="14"></line>
    </svg>
  );

  return (
    <div className="chatbot-container">
        {/* Chat Window */}
        {isOpen && (
            <div className="chatbot-window">
                {/* Header */}
                <div className="chatbot-header">
                    <div className="header-info">
                    <GoDependabot />
                    <div className="status-dot"></div>
                    <span className="header-title">Chat with Dom Support</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="header-button">
                    <MinimizeIcon />
                    </button>
                </div>
                
                {/* Messages */}
                <div className="messages-container">
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
                    
                    {/* Typing indicator */}
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
                
                {/* Input */}
                <div className="input-container">
                    <div className="input-wrapper">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask something..."
                        className="message-input"
                        disabled={isTyping}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="send-button"
                    >
                        <SendIcon />
                    </button>
                    </div>
                </div>
            </div>
        )}

        {/* Toggle Button */}
        <div onClick={() => setIsOpen(!isOpen)} className="toggle-button">
            {isOpen ? <></> :
                <>
                 <div className="chatbot-window-closed">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="header-info">
                            <GoDependabot />
                            <div className="status-dot"></div>
                            <span className="header-title">Chat with Dom Support</span>
                        </div>
                        <button onClick={() => setIsOpen(true)} className="header-button">
                            <MinimizeIcon />
                        </button>
                    </div>  
                </div>
                </>
            }
        </div>
    </div>
  );
};