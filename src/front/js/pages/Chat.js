import React, { useState, useEffect, useRef } from "react";
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../../../../src/appwriteConfig.js';
import { useAuth } from "../store/AuthContext";
import { useParams } from "react-router-dom";
import { ID, Role, Permission, Query } from "appwrite";
import Header from "../component/Header";

const Chat = () => {

    const { user } = useAuth();
    const { friend_id } = useParams();

    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');
    const senderID = localStorage.getItem("user_id");

    const messagesEndRef = useRef(null);  // Reference to the bottom of the message container


    useEffect(() => {
        getMessages()
        const unsubscribe = client.subscribe(
            `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
            (response) => {
                if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                    const newMessage = response.payload;

                    // Check if the new message belongs to the current chat
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
            unsubscribe(); // Clean up the subscription
        };
    }, [senderID, friend_id]); // Re-run the subscription only when `senderID` or `friend_id` changes



    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);  // Runs every time the messages change

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
        // console.log('response:', response);

        // setMessages(prevState => [...prevState, response]);
        setMessageBody('');
        console.log(user)
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



    // const deleteMessage = async (message_id) => {
    //     await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
    //     // setMessages(prevState => messages.filter(message => message.$id !== message_id));
    // }
    return (
        <main className="chat-container">

            <Header />
            <div className="room--container">
                <div className="message--wrapper ">
                    {messages.map((message) => {
                        // console.log("SENDER", message.senderID); // Log para verificar el senderID de cada mensaje
                        // console.log("USER_id", senderID);       // Log para verificar el ID del usuario actual

                        // Determinar si el mensaje fue enviado por el usuario actual
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
                                    <span>{message.body}</span>
                                </div>
                            </div>
                        );
                    })}

                    <div ref={messagesEndRef} /> {/* Empty div to mark the end of the messages */}
                </div>
                <form id="message--form" onSubmit={handleSubmit} className="message--form">
                    <div className="textAreaHolder">
                        <textarea
                            required
                            maxLength={1000}
                            placeholder="Type your message here..."
                            onChange={(e) => { setMessageBody(e.target.value) }}
                            value={messageBody}
                        />
                    </div>
                    <div className="send-btn--wrapper">
                        <button className="btnchat btn-secondary" type="submit">Send</button>
                    </div>
                </form>
            </div>

        </main>
    );
};

export default Chat;