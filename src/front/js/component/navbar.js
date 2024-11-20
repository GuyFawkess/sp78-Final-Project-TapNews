import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TapNewsLogo from '/workspaces/sp78-Final-Project-TapNews/public/1729329195515-removebg-preview.png';

const NavbarBottom = () => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("user_id"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [localStorage]);

  return (
    <Navbar className="navbar-fixed-bottom">
      <Container fluid>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-evenly w-100">
            <Nav.Link as={Link} to="/profile">
              <FontAwesomeIcon size="2xl" icon={faUser} style={{ color: "#FFFFFF" }} className="nav-icon" />
            </Nav.Link>
            {userId && (
              <Nav.Link as={Link} to="/friends">
                <FontAwesomeIcon size="2xl" icon={faUserGroup} style={{ color: "#FFFFFF" }} className="nav-icon" />
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/">
              <img className="logo" src={TapNewsLogo} alt="TapNews Logo" />
            </Nav.Link>
            <Nav.Link as={Link} to="/search">
              <FontAwesomeIcon size="2xl" icon={faMagnifyingGlass} style={{ color: "#FFFFFF" }} className="nav-icon" />
            </Nav.Link>
            <Nav.Link as={Link} to="#regional">
              <FontAwesomeIcon size="2xl" icon={faFilter} style={{ color: "#FFFFFF" }} className="nav-icon" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarBottom;
