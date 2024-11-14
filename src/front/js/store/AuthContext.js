import React, { createContext, useContext, useEffect, useState } from "react";
import { account } from "../../../appwriteConfig";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    useEffect(() => {
        setLoading(false)
    }, []);

    const hangleUserLogin = async (e, credentials) => {
        e.preventDefault();

        try {
            const response = await account.createEmailPasswordSession(credentials.email, credentials.password);

        } catch (error) {
            console.log(error)
        }
    };

    const constextData = {
        user,
        hangleUserLogin
    }

    return <AuthContext.Provider value={constextData}>
        {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>

}

export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext;