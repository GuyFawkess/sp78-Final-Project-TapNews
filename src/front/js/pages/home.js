import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !email || !password || !confirmPassword) {
      alert("Por favor complete todos los campos");
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "La contraseña debe tener al menos 8 caracteres y contener tanto letras como números"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    actions.signup(userName, email, password);
    navigate("/demo");
  };

  return (
    <div className="text-center mt-3">
      <div className="full-screen-container">
        <div className="form-container">
          <h1 className="text-center mb-2 mt-4">Registro de Usuario</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-1" controlId="formBasicUser">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="user"
                placeholder="Ingrese su Usuario"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicPassword2">
              <Form.Label>Confirmacion de Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repita su Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Registrese
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
