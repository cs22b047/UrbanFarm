import React, { useState, useRef } from 'react';
import './Chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const chatboxRef = useRef(null);
    const [chatVisibility, setChatVisibility] = useState(false)

    const addMessage = (sender, text) => {
        const newMessage = {
            sender,
            text: sender === 'user' ? `You: ${text}` : `Bot: ${text}`,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight; // Scroll to bottom
        }
    };

    const handleSend = () => {
        if (userInput.trim()) {
            addMessage('user', userInput);
            const message = userInput;
            setUserInput('');

            // Simulate an API call
            fetch('https://urbanfarm.onrender.comchat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            })
                .then((response) => response.json())
                .then((data) => {
                    addMessage('bot', data.reply);
                });
        }
    };

    return (
        <div
            className={`transition-transform duration-500 ${chatVisibility ? 'translate-y-0' : 'translate-y-full'
                }`}
            style={{
                transform: chatVisibility ? 'translateY(0)' : 'translateY(505px)',
            }}
        >
            <div className='flex w-full px-[15px] justify-between bg-white border-gray-300 border-[1px] border-b-0 rounded-t-lg border-solid'
                onClick={() => { setChatVisibility((prev) => { return !prev }) }}
            >
                <div className='text-blue-500 text-3xl font-bold p-[15px] w-full '>Chat</div>
                <div className=' my-auto h-fit ' ><FontAwesomeIcon icon={faAngleDown} style={{
                    transition: 'transform 0.5s ease',
                    transform: chatVisibility ? 'rotate(0deg)' : 'rotate(180deg)',
                }} /></div>
            </div>
            <div>
                <div
                    className='w-full mx-auto'
                    id="chatbox"
                    ref={chatboxRef}
                    style={{
                        border: '1px solid #ddd',
                        padding: '15px',
                        width: '100%',
                        height: '400px',
                        overflowY: 'scroll',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        marginBottom: '10px',
                    }}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.sender}`}
                            style={{
                                margin: '10px 0',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                maxWidth: '80%',
                                lineHeight: '1.5',
                                fontSize: '14px',
                                backgroundColor: msg.sender === 'user' ? '#e1f5fe' : '#dcedc8',
                                color: msg.sender === 'user' ? '#0277bd' : '#558b2f',
                                textAlign: msg.sender === 'user' ? 'right' : 'left',
                                marginLeft: msg.sender === 'user' ? 'auto' : 'initial',
                                marginRight: msg.sender === 'user' ? 'initial' : 'auto',
                            }}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
                <fieldset className="fieldInput px-[15px] bg-white mb-2">
                    <input className="form-input" type="email" placeholder="Type your message..." value={userInput}
                        onChange={(e) => setUserInput(e.target.value)} />
                    <button type="submit" onClick={handleSend} className="form-submit">Enter</button>
                </fieldset>
            </div>
        </div>
    );
};

export default Chatbot;
