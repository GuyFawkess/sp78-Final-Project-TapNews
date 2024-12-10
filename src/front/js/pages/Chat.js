import React, { useState, useEffect, useRef } from "react";
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../../../../src/appwriteConfig.js';
import { useAuth } from "../store/AuthContext";
import { useParams } from "react-router-dom";
import { ID, Role, Permission, Query } from "appwrite";
import Header from "../component/Header";
import { useLocation } from 'react-router-dom';

const Chat = () => {
    const { user } = useAuth();
    const { friend_id } = useParams();
    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');
    const senderID = localStorage.getItem("user_id");
    const messagesEndRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.url) {
            const url = location.state.url;
            setMessageBody(url); 
        }
    }, [location]);

    useEffect(() => {
        getMessages();
        const unsubscribe = client.subscribe(
            `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
            (response) => {
                if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                    const newMessage = response.payload;

                    const isRelevantMessage =
                        (newMessage.senderID === senderID && newMessage.recipientID === friend_id) ||
                        (newMessage.senderID === friend_id && newMessage.recipientID === senderID);

                    if (isRelevantMessage) {
                        setMessages((prevMessages) => [...prevMessages, newMessage]);
                    }
                }
            }
        );

        return () => {
            unsubscribe();
        };
    }, [senderID, friend_id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const senderID = localStorage.getItem('user_id');
        if (!senderID) {
            console.error("Sender ID not found in local storage.");
            return;
        }

        let payload = {
            senderID: senderID,
            recipientID: friend_id,
            username: user.name,
            body: messageBody
        }

        let permissions = [
            Permission.write(Role.user(payload.senderID)),
            Permission.read(Role.user(payload.senderID)),
            Permission.read(Role.user(payload.recipientID)),
        ]

        let response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
        )
        setMessageBody('');
        console.log('MESSAGE CREATED', response);
    }

    const getMessages = async () => {
        if (!senderID || !friend_id) {
            console.error("Sender ID or friend ID is missing.");
            return;
        }

        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID_MESSAGES,
                [
                    Query.or([ 
                        Query.and([ 
                            Query.equal("senderID", senderID),
                            Query.equal("recipientID", friend_id)
                        ]),
                        Query.and([ 
                            Query.equal("senderID", friend_id),
                            Query.equal("recipientID", senderID)
                        ])
                    ])
                ]
            );

            setMessages(response.documents);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const convertToLink = (text) => {
        const urlPattern = /https?:\/\/[^\s]+/g;
        return text.replace(urlPattern, (url) => {
            return `<a href="${url}" rel="noopener noreferrer">${url}</a>`;
        });
    };

    return (
        <main className="chat-container">
            <Header />
            <div className="room--container">
                <div className="message--wrapper">
                    {messages.map((message) => {
                        const isSentByUser = message.senderID === senderID;

                        return (
                            <div
                                key={message.$id}
                                className={`${isSentByUser ? "message--sent" : "message--received"}`}
                            >
                                <div className="message--header">
                                    <p>
                                        {message?.username ? (
                                            <span>{message.username}</span>
                                        ) : (
                                            <span>Anonymous</span>
                                        )}
                                        <small className="message-timestamp">
                                            {new Date(message.$createdAt).toLocaleString([], {
                                                weekday: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </small>
                                    </p>
                                </div>

                                <div className={`${isSentByUser ? "message--body--sender message--body" : "message--body"}`}>
                                    <span dangerouslySetInnerHTML={{ __html: convertToLink(message.body) }} />
                                </div>
                            </div>
                        );
                    })}

                    <div ref={messagesEndRef} />
                </div>
                <form id="message--form" onSubmit={handleSubmit} className="message--form">
                    <div className="textAreaHolder">
                        <textarea
                            required
                            maxLength={1000}
                            placeholder="Escribe aquí tu mensaje..."
                            onChange={(e) => { setMessageBody(e.target.value) }}
                            value={messageBody}
                        />
                    </div>
                    <div className="send-btn--wrapper">
                        <button className="btnchat btn-secondary" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Chat;
