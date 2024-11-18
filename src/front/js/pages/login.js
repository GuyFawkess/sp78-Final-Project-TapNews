import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useAuth } from "../store/AuthContext";

import "/workspaces/sp78-Final-Project-TapNews/src/front/styles/login.css"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import banner from "/workspaces/sp78-Final-Project-TapNews/public/Banner.jpg"
import footerlogin from "/workspaces/sp78-Final-Project-TapNews/public/footerlogin.jpg"


export const LogIn = () => {
  const { user, handleUserLogin } = useAuth();
  const { actions } = useContext(Context);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  // METI LA INFO DE EMAIL Y PASS EN UN OBJETO
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });//ponemos name en corchetes bc is a dynamic variable, it means that the name will use as the email and the password
    console.log(credentials)
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    //Buscar al usuario registrado en el actions
    if (credentials.email && credentials.password) {
      try {
        await actions.login(credentials.email, credentials.password)
          .then(() => {
            navigate("/")
          })
      }
      catch (e) {
        setErrorMessage(e.message)
      }
    }

  };

  //AQUI MEZCLE LAS DOS FUNCONES EN UNA
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    handleLogin(e); // Call your first function
    //handleUserLogin(e, credentials); // Call the second function with event and credentials
  };

  return (
    <>
     <img src={banner} style={{ height: "20%", width: "100%" }} />
    <div className="text-center container mt-3">
      <div className="full-screen-container">
        <div className="form-container mx-auto">
          <Form onSubmit={handleSubmit}>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="label-email mb-5">Email</Form.Label>
              <Form.Control
                className="input-email"
                type="email"
                name="email"
                placeholder="Ingresar email"
                value={credentials.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="label-pass mb-3">Contraseña</Form.Label>
              <Form.Control
                className="input-pass"
                type="password"
                name="password"
                placeholder="Ingresar Contraseña"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button className=" access mt-5" type="submit">
              Acceder
            </Button>
            <Link to="/signup" className="link"><Button className="register2 mt-5" type="submit">
              Registro
            </Button></Link>
          </Form>
        </div>
      </div>
    </div>
    <img src={footerlogin} style={{ height: "25%", width: "100%", position:"absolute",bottom: "0"}} />
    </>
  );
};
