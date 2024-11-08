import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import tapnews from "/workspaces/sp78-Final-Project-TapNews/public/Captura de pantalla 2024-11-06 a las 20.51.37.png";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <img className="top-right-image" src={tapnews} alt="tapnews" />
      <div className="full-screen-container">
        <div className="form-container">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="user" placeholder="Ingrese su Usuario" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Direccion de Email</Form.Label>
              <Form.Control type="email" placeholder="Ingrese su Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repita su Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Repita su Contraseña" />
            </Form.Group>
            <Link to="/demo">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};
