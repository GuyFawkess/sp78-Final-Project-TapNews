import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Context } from "../store/appContext";


// export const Demo = () => {
//   const { store, actions } = useContext(Context);

  export const Demo = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
  

  const handleLogin = (e) => {
    e.preventDefault();
    //Buscar al usuario registrado en el actions
    actions.login(email, password)
    .then((data) => {
      setErrorMessage("");
      localStorage.setItem("jwt-token", data.token);
      alert("Acceso exitoso")
    })
    .catch((error) => {
      setErrorMessage("usuario o contraseña no registrada"); // Mostrar el mensaje de error si hay alguno
      alert("usuario o contraseña no registrada");  // Alerta en caso de error
    });
  }


  return (
    <div className="container">
		<div className="full-screen-container">
		<div className="form-container">
      <Form onSubmit={handleLogin}>
		<h1>Acceso de Usuario</h1>
    {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <Form.Control type="email" placeholder="Ingresar email"  value={email}
              onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label></Form.Label>
          <Form.Control type="password" placeholder="Ingresar Contraseña"  value={password}
              onChange={(e) => setPassword(e.target.value)}/>
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
