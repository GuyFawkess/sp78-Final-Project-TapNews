import React from "react";
import { Link } from "react-router-dom";
import tapnews from "/workspaces/sp78-Final-Project-TapNews/public/tapnews.jpg";

export const Navbar = () => {
  return (
    <nav className="navbar bg-body-tertiary bg-primary" style={{ height: "80px" }}>
      <div className="container d-flex align-items-center" style={{ height: "80px" }}>
        <a className="navbar-brand" href="#">
          <img
            className="top-left-image"
            src={tapnews}
            alt="tapnews"
            style={{ height: "80px", width: "auto" }}
          />
        </a>
      </div>
    </nav>
  );
};
