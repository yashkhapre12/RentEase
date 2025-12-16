import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { crudApi } from '../api/axiosConfig';
import ChatWindow from './ChatWindow';

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const user = useSelector((state) => state.logged.user);
    const userId = user?.userId || sessionStorage.getItem("userId");

    useEffect(() => {
        if (userId) {
            fetchChats();
        }
    }, [userId]);

    const fetchChats = async () => {
        try {
            const response = await crudApi.get(`/chats/user/${userId}`);
            setChats(response.data);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    return (
        <div className="chat-list-container" style={{ padding: '20px' }}>
            <h2>My Chats</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div className="chats-sidebar" style={{ width: '300px', borderRight: '1px solid #ccc' }}>
                    {chats.length === 0 ? <p>No chats found.</p> : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {chats.map((chat) => (
                                <li
                                    key={chat.chatId}
                                    onClick={() => setSelectedChatId(chat.chatId)}
                                    style={{
                                        padding: '10px',
                                        borderBottom: '1px solid #eee',
                                        cursor: 'pointer',
                                        background: selectedChatId === chat.chatId ? '#f0f0f0' : 'transparent'
                                    }}
                                >
                                    <strong>{chat.property.address}</strong>
                                    <br />
                                    <small>
                                        With: {parseInt(userId) === chat.tenant.userId
                                            ? `${chat.landlord.firstName} ${chat.landlord.lastName}`
                                            : `${chat.tenant.firstName} ${chat.tenant.lastName}`}
                                    </small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="chat-main" style={{ flex: 1 }}>
                    {selectedChatId ? (
                        <ChatWindow chatId={selectedChatId} onClose={() => setSelectedChatId(null)} />
                    ) : (
                        <p>Select a chat to start messaging.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
