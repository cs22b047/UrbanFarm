import React, { useState, useRef } from 'react';
import './Chatbot.css'; // Assuming you move the CSS styles to a separate file

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const chatboxRef = useRef(null);

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
            fetch('http://localhost:8080/chat', {
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
        <div style={{ textAlign: 'center' }}>
            <div className='text-blue-500 text-3xl font-bold p-[15px] w-full '>Chat</div>
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
                    borderRadius: '8px',
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
            <div className='w-full'>
                {/* <input
                    className='w-full mx-auto p-[15px]'
                    id="chat_input"
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        fontSize: '14px',
                    }}
                /> */}

                {/* <div
                    className='w-full px-[15px] py-[10px] rounded-lg mx-auto box-border '
                    
                >
                    Send
                </div> */}
            </div>
            <fieldset class="fieldInput px-[15px]">
                <input class="form-input" type="email" placeholder="Type your message..." value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}/>
                <button type="submit" onClick={handleSend} class="form-submit">Enter</button>
            </fieldset>
        </div>
    );
};

export default Chatbot;
