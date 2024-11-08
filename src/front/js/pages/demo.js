import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Context } from "../store/appContext";
// import tapnews from "/workspaces/sp78-Final-Project-TapNews/public/tapnews.jpg";


export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
		<div className="full-screen-container">
		<div className="form-container">
      <Form>
	  {/* <img className="top-left-image" src={tapnews} alt="tapnews" /> */}
		<h1>Acceso de Usurio</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <Form.Control type="email" placeholder="Ingresar email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label></Form.Label>
          <Form.Control type="password" placeholder="Ingresar Contraseña" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Acceder
        </Button>
      </Form>
    </div>
	</div>
	</div>
  );
};
