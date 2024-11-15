import React, { useEffect, useState } from "react";
import { useAuth } from "../store/AuthContext";
import { useNavigate, Link } from "react-router-dom";


const LoginPage = () => {
    const { user, handleUserLogin } = useAuth();
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
                <form onSubmit={(e) => { handleUserLogin(e, credentials) }}>
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
                        <input className="btn btn--lg btn--main" type="submit" value="Login" />
                    </div>
                </form>
                <p>No tienes una cuenta? Registrate <Link to="/register2">aquí</Link></p>
            </div>

        </div>
    )
}

export default LoginPage;