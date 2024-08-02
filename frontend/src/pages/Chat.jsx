import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/Chat.css';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim() === '') {
      return; // Do not send empty messages
    }

    const userMessage = { text: message, sender: 'user' };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage(''); // Clear the input field

    api
      .post("/api/message/", { conversation: updatedMessages })
      .then((res) => {
        if (res.status === 200) {
          const botMessage = { text: res.data.message, sender: 'bot' };
          setMessages([...updatedMessages, botMessage]);
        } else {
          const errorMessage = { text: 'Error sending message. Please try again.', sender: 'bot' };
          setMessages([...updatedMessages, errorMessage]);
        }
      })
      .catch((err) => {
        const errorMessage = { text: 'Error sending message. Please try again.', sender: 'bot' };
        setMessages([...updatedMessages, errorMessage]);
      });
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-button" onClick={sendMessage}>Send</button>
        </div>
        <div className="back-button-container">
          <button className="back-button" onClick={goHome}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
