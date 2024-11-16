import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import usuario from "/workspaces/sp78-Final-Project-TapNews/public/usuario.png";
import "../../styles/home.css";
import { Form, Button } from "react-bootstrap";

export const SignUp = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // Function to validate credentials
  function validateCredentials({ username, email, password, confirmPassword }) {
    const errors = [];
    if (!username || !email || !password || !confirmPassword) {
      errors.push("Por favor complete todos los campos");
    }
    if (password && !PASSWORD_REGEX.test(password)) {
      errors.push("La contraseña debe tener al menos 8 caracteres y contener tanto letras como números");
    }
    if (password !== confirmPassword) {
      errors.push("Las contraseñas no coinciden");
    }
    return errors;
  }

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate credentials
    const validationErrors = validateCredentials(credentials);

    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n")); // Display all errors in a single alert
      return;
    }

    try {
      // Perform the signup action
      await actions.signup(
        credentials.username,
        credentials.email,
        credentials.password
      );

      // Navigate to the login page on success
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Algo salió mal durante el registro. Por favor, intente nuevamente.");
    }
  };

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="text-center mt-3">
      <div className="full-screen-container">
        <div className="form-container">
          <img src={usuario} style={{ height: "250px", width: "auto" }} />
          <h1 className="text-center mb-2 mt-4">Registro de Usuario</h1>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-1" controlId="formBasicUser">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Ingrese su Usuario"
                value={credentials.username || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Ingrese su Email"
                value={credentials.email || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Contraseña"
                value={credentials.password || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicPassword2">
              <Form.Label>Confirmacion de Contraseña</Form.Label>
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder="Repita su Contraseña"
                value={credentials.confirmPassword || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Regístrese
            </Button>
          </Form>
        </div>

        <p className="text-white">
          Tienes una cuenta, inicia sesión{" "}
          <Link to="/login" className="link">
            aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
