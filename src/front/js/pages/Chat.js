import React, { useState, useEffect, useRef } from "react";
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from "/workspaces/sp78-Final-Project-TapNews/src/appwriteConfig.js";
import { useAuth } from "../store/AuthContext";
import { ID, Role, Permission } from "appwrite";
import Header from "../component/Header";

import { IoTrashOutline } from "react-icons/io5";

const Chat = () => {

    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');

    const messagesEndRef = useRef(null);  // Reference to the bottom of the message container


    useEffect(() => {
        getMessages();

        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, (response) => {

            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                console.log('A MESSAGE WAS CREATED', response.payload)
                setMessages(prevState => [...prevState, response.payload]);
            }
            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                console.log('A MESSAGE WAS DELETED!!!');
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id));
            }
        });

        return () => {
            unsubscribe();
        }

    }, []);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);  // Runs every time the messages change

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            senderID: user.$id,
            recipientID: user.$id,
            username: user.name,
            body: messageBody
        }

        let permissions = [
            Permission.write(Role.user(user.$id)),
            Permission.read(Role.user(payload.senderID)),
            Permission.read(Role.user(payload.recipientID)),

        ]

        let response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            permissions
        )
        // console.log('response:', response);

        // setMessages(prevState => [...prevState, response]);
        setMessageBody('');
        console.log('MESSAGE CREATED', response);

    }

    const getMessages = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                `senderID=${user.$id}`,
                `recipientID=${friendId}`
            ]

        );
        // console.log('response:', response);
        setMessages(response.documents);
    }

    const deleteMessage = async (message_id) => {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
        // setMessages(prevState => messages.filter(message => message.$id !== message_id));
    }
    return (
        <main className="container">

            <Header />
            <div className="room--container">
                <div>
                    {messages.map((message) => (
                        <div key={message.$id} className="message--wrapper">
                            <div className="message--header">
                                <p>
                                    {message?.username ? (
                                        <span>{message.username}</span>
                                    ) : (
                                        <span>Anonymous</span>
                                    )}
                                    <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>
                                </p>

                                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) &&
                                    <IoTrashOutline
                                        className="delete--btn"
                                        onClick={() => { deleteMessage(message.$id) }}
                                    />

                                }

                            </div>


                            <div className="message--body">
                                <span>{message.body}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Empty div to mark the end of the messages */}
                </div>
                <form id="message--form" onSubmit={handleSubmit} className="message--form">
                    <div>
                        <textarea
                            required
                            maxLength={1000}
                            placeholder="Type your message here..."
                            onChange={(e) => { setMessageBody(e.target.value) }}
                            value={messageBody}
                        />
                    </div>
                    <div className="send-btn--wrapper">
                        <button className="btn btn-secondary" type="submit">Send</button>
                    </div>
                </form>
            </div>

        </main>
    );
};

export default Chat;