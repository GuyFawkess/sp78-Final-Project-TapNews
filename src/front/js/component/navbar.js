import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TapNewsLogo from '/workspaces/sp78-Final-Project-TapNews/public/1729329195515-removebg-preview.png'

const NavbarBottom = () => {


	return (
    <Navbar className="navbar-fixed-bottom">
      <Container fluid>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex">
            <Nav.Link href="#profile"><FontAwesomeIcon size="2xl" icon={faUser} style={{color: "#FFFFFF",}} className="nav-icon" aria-controls="basic-navbar-nav"/></Nav.Link>
            <Nav.Link href="#friends"><FontAwesomeIcon size="2xl" icon={faUserGroup} style={{color: "#FFFFFF",}} className="nav-icon" aria-controls="basic-navbar-nav"/></Nav.Link>
            <Nav.Link href="#home"><img className="logo" src={TapNewsLogo} /></Nav.Link>
            <Nav.Link href="#national"><FontAwesomeIcon size="2xl" icon={faMagnifyingGlass} style={{color: "#FFFFFF",}} className="nav-icon" aria-controls="basic-navbar-nav"/></Nav.Link>
            <Nav.Link href="#regional"><FontAwesomeIcon size="2xl" icon={faFilter} style={{color: "#FFFFFF",}} className="nav-icon" aria-controls="basic-navbar-nav"/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBottom;
