import React, { useEffect, useState } from "react";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const { user, hangleUserLogin } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (user) {
            navigate("/chat");
        }
    }, [user]); //tengo que dejar el user?

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setCredentials({ ...credentials, [name]: value }); //ponemos name en corchetes bc is a dynamic variable, it means that the name will use as the email and the password

    }
    return (
        <div className="auth--conainer">
            <div className="form--wrapper">
                <form onSubmit={(e) => { hangleUserLogin(e, credentials) }}>
                    <div className="field--wrapper">
                        <label>Email:</label>
                        <input
                            type="email"
                            required
                            name="email"
                            placeholder="Enter your Email..."
                            value={credentials.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <label>Password:</label>
                        <input
                            type="password"
                            required
                            name="password"
                            placeholder="Enter Password..."
                            value={credentials.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <button className="btn btn--lg btn--main" type="submit" value="Login">Login</button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default LoginPage;