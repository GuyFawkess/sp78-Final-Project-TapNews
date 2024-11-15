import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import usuario  from "/workspaces/sp78-Final-Project-TapNews/public/usuario.png"


export const LogIn = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault();
    //Buscar al usuario registrado en el actions
      if(email && password){
        try
        {await actions.login(email, password)
        .then(() => {
            navigate("/")
        })}
        catch (e) {
            setErrorMessage(e.message)
        }
    }
      
  };

  return (
    <div className="text-center container mt-5">
      <div className="full-screen-container">
        <div className="form-container">
          <Form onSubmit={handleLogin}>
          <img src={usuario} style={{ height: "250px", width: "auto" }} />
            <h1 className="my-5">Acceso de Usuario</h1>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresar email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresar Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Acceder
            </Button>
          </Form>
        </div>
        <Link to="/signup" className="link">
                Acceso a Registro
             </Link>
      </div>
    </div>
  );
};
