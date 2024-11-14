import React, { useEffect } from "react";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/chat");
        }
    }, [user]); //tengo que dejar el user?


    return (
        <h1>Login</h1>
    )
}

export default LoginPage;