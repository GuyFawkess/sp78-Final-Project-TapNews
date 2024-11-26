import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useAuth } from "../store/AuthContext";
import "../../styles/login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import banner from "../../../../public/Banner.jpg";
import footerlogin from "../../../../public/footerlogin.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";  

export const LogIn = () => {
  const { user, handleUserLogin, handleUserLogout } = useAuth();
  const { actions } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      try {
        await actions.login(credentials.email, credentials.password)
          .then(() => {
            navigate("/");
          });
      } catch (e) {
        setErrorMessage(e.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);
    handleUserLogin(e, credentials);
  };

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                <div className="d-flex justify-content-center align-items-center">
                  <Form.Control
                    className="input-pass"
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    placeholder="Ingresar Contraseña"
                    value={credentials.password}
                    onChange={handleInputChange}
                  />
                  <FontAwesomeIcon 
                    icon={showPassword ? faEyeSlash : faEye} 
                    size="xl"
                    style={{ color: "#0044CC", cursor: "pointer" }}
                    onClick={PasswordVisibility} 
                  />
                </div>
              </Form.Group>

              <Link to="/signup" className="link">
                <Button className="register2 mt-5" type="submit">
                  Registro
                </Button>
              </Link>
              <Button className="access mt-5" type="submit">
                Acceder
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <img
        src={footerlogin}
        style={{ height: "25%", width: "100%", position: "absolute", bottom: "0" }}
      />
    </>
  );
};
