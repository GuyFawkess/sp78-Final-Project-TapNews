import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { LogOut } from "react-feather";
const Header = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");
    const { friend_id } = useParams();

    useEffect(() => {
        actions.getUser(friend_id);
    }, [])




    return (
        <div id="header--wrapper">
            Hablando con {store.user.username || "N/A"}
            <LogOut onClick={() => { navigate("/friends") }} className="header--link" />
        </div>
    );
};

export default Header;