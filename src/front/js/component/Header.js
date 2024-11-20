import React from "react";
import { useAuth } from "../store/AuthContext";
import { LogOut } from "react-feather";
const Header = () => {
    const { user, handleUserLogout } = useAuth();
    return (
        <div id="header--wrapper">
            {user ? (
                <>
                    WELCOME {user.name}
                    <LogOut onClick={handleUserLogout} className="header--link" />
                </>
            ) : (
                // <button>Login</button>
                <></>
            )}
        </div>
    );
};

export default Header;