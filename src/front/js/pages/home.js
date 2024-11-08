import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    navigate("/demo");
  };

  return (
    <div className="text-center mt-5">
      <div className="full-screen-container">
        <div className="form-container">
          <h1 className="text-center mb-4">Registro de Usuario</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control type="user" placeholder="Ingrese su Usuario" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control type="email" placeholder="Ingrese su Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                placeholder="Repita su Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {/* <Link to="/demo"> */}
              
              <Button variant="primary" type="submit">
                Rgistrese
              </Button>
            {/* </Link> */}
          </Form>
        </div>
      </div>
    </div>
  );
};
