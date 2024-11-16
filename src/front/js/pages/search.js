import React, { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    console.log("Buscar:", searchTerm);
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        paddingTop: "20px",
        minHeight: "100vh", // Asegura que el fondo cubra toda la altura de la pantalla
        background: "linear-gradient(to bottom, #003366, #66ccff)", // Gradiente azul de oscuro a claro
      }}
    >
      <div
        className="text-center"
        style={{ width: "100%", maxWidth: "500px", paddingLeft: "10px", paddingRight: "10px" }}
      >
        <h1 className="text-center mb-3 text-light">Búsqueda de Usuarios</h1>

        {/* Grupo de entrada de Bootstrap con ícono y márgenes uniformes */}
        <div className="input-group mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Buscar..."
            className="form-control"
          />
          <button
            className="btn btn-outline-secondary"
            onClick={handleSearchClick}
            style={{
              borderTopLeftRadius: "0", 
              borderBottomLeftRadius: "0", 
              padding: "0.5rem 1rem"
            }}
          >
            <i className="fa-solid fa-magnifying-glass text-light"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
