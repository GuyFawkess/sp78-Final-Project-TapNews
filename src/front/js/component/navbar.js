import React from "react";
import { Link } from "react-router-dom";
import tapnews from "/workspaces/sp78-Final-Project-TapNews/public/tapnews.jpg";

export const Navbar = () => {
	return (
		<nav class="navbar bg-body-tertiary bg-primary">
  <div class="container">
    <a class="navbar-brand" href="#">
        
    <img className="top-left-image" src={tapnews} alt="tapnews"  width="30" height="24"/>
    </a>
  </div>
</nav>
	);
};
