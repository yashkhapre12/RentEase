import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { crudApi } from '../api/axiosConfig';

const ChatWindow = ({ chatId, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((state) => state.logged.user);
    const userId = user?.userId || sessionStorage.getItem("userId");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
        return () => clearInterval(interval);
    }, [chatId]);

    const fetchMessages = async () => {
        try {
            const response = await crudApi.get(`/messages/${chatId}`);
            setMessages(response.data);
            scrollToBottom();
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            await crudApi.post("/messages", {
                chatId: chatId,
                senderId: parseInt(userId),
                content: newMessage,
            });

            setNewMessage("");
            fetchMessages();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="chat-window" style={{ border: '1px solid #ccc', padding: '10px', height: '400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <h3>Chat</h3>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
            </div>
            <div className="messages-list" style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                {messages.map((msg) => (
                    <div key={msg.messageId} style={{
                        textAlign: msg.sender.userId === parseInt(userId) ? 'right' : 'left',
                        margin: '5px 0'
                    }}>
                        <span style={{
                            background: msg.sender.userId === parseInt(userId) ? '#dcf8c6' : '#fff',
                            padding: '5px 10px',
                            borderRadius: '10px',
                            display: 'inline-block',
                            border: '1px solid #eee'
                        }}>
                            {msg.content}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="message-input" style={{ display: 'flex', marginTop: '10px' }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{ flex: 1, padding: '5px' }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage} style={{ marginLeft: '5px', padding: '5px 10px' }}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;
