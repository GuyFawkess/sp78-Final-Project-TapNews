import React, { createContext, useContext, useEffect, useState } from "react";
import { account } from "../../../appwriteConfig";
import { useNavigate } from "react-router-dom";

import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        getUserOnLoad();
    }, []);
    const getUserOnLoad = async () => {
        try {
            const session = await account.getSession("current") //check if session existe
            console.log("Session found: ", session)

            const accountDetails = await account.get();
            console.log('LOGGED IN', accountDetails);
            setUser(accountDetails);

        } catch (error) {
            if (error.code === 401) {
                console.warn("Sesion activa no encontrada, quizas session no iniciada")
            } else {
                console.warn("Error during login check:", error);
            }
        } finally {
            setLoading(false);
        }
    }


    const handleUserRegister = async (e, credentials) => {
        e.preventDefault();

        // if (credentials.password1 !== credentials.password2) {
        //     alert("Las contraseñas no coinciden");
        //     return;
        // }

        try {

            const response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password,
                credentials.username
            );

            // await account.createEmailPasswordSession(credentials.email, credentials.password1);
            // const accountDetails = await account.get();
            // console.log('LOGGED IN', accountDetails);
            // setUser(accountDetails);
            // navigate("/");


            console.log("REGISTED", response);

        } catch (error) {
            console.error("Error during registration:", error);
        }


    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();

        try {
            // Check if a session already exists
            const existingSession = await account.get();
            console.log("Already logged in:", existingSession);

            // If user is already logged in, set the user and navigate
            setUser(existingSession);
            //navigate("/chat/:friend_id");
        } catch (error) {
            if (error.code === 401) {
                // If no session exists, create a new one
                try {
                    const response = await account.createEmailPasswordSession(credentials.email, credentials.password);
                    console.log('LOGGED IN', response);

                    const accountDetails = await account.get();
                    setUser(accountDetails);
                    // navigate("/chat");
                } catch (sessionError) {
                    console.error("Failed to create a session:", sessionError);
                }
            } else {
                console.error("Error during login check:", error);
            }
        }
    };

    const handleUserLogout = async () => {
        try {
            await account.deleteSession('current');
            //localStorage.removeItem("user_id")
            setUser(null);

        } catch (error) {
            console.error("Logout error", error)
        }
    };

    const constextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserRegister
    }

    return <AuthContext.Provider value={constextData}>
        {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>

}

export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext;
