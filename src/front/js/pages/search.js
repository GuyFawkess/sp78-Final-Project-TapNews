import React, { useState } from "react";

const Search = () => {
  // Estado para almacenar el valor ingresado en el input
  const [searchTerm, setSearchTerm] = useState("");

  // Función para manejar el cambio de texto en el input
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar el clic en el botón de búsqueda
  const handleSearchClick = () => {
    console.log("Buscar:", searchTerm); // Aquí puedes hacer la búsqueda real
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      
    >
      <div>
        <h1>Busqueda de Usuarios</h1>

        {/* Input de búsqueda */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange} // Actualiza el estado al escribir
          placeholder="Buscar..."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
          }}
          className="form-control mb-3" // Clase Bootstrap para estilizar el input
        />

        {/* Botón de búsqueda */}
        <button
          onClick={handleSearchClick} // Acción al hacer clic
          className="btn btn-primary w-100"
          style={{
            padding: "10px",
            fontSize: "16px",
          }}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Search;
