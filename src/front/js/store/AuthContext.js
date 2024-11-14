import React, { createContext, useContext, useEffect, useState } from "react";

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