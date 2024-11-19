import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Context } from "../store/appContext";

export const Search = () => {
  const { store, actions } = useContext(Context);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate(); // Hook para la navegación

  // Manejador de cambios en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  // Carga inicial de todos los usuarios
  useEffect(() => {
    actions.getAllUsers().catch((error) =>
      console.error("Error al obtener todos los usuarios:", error)
    );
  }, [actions]);

  // Filtra los usuarios cuando inputValue cambia
  useEffect(() => {
    if (inputValue) {
      const filtered = actions.getFilterUser(inputValue);
      if (Array.isArray(filtered)) {
        setFilteredUsers(filtered);
      }
    } else {
      setFilteredUsers(store.listuser || []);
    }
  }, [inputValue, actions, store.listuser]);

  // Maneja el clic en un usuario para redirigir a su perfil
  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`); // Redirige a la ruta del perfil del usuario
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        paddingTop: "20px",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #003366, #66ccff)",
      }}
    >
      <div
        className="text-center"
        style={{ width: "100%", maxWidth: "500px", paddingLeft: "10px", paddingRight: "10px" }}
      >
        <h1 className="text-center mb-3 text-light">Búsqueda de Usuarios</h1>

        {/* Grupo de entrada de Bootstrap */}
        <div className="input-group mb-3">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Buscar..."
            className="form-control"
          />
          <button
            className="btn btn-secondary"
            onClick={() => actions.getFilterUser(inputValue)}
            style={{
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              padding: "0.5rem 1rem",
            }}
          >
            <i className="fa-solid fa-magnifying-glass text-light"></i>
          </button>
        </div>

        {/* Mostrar los resultados debajo del input */}
        <div className="user-list text-light mt-5">
          {filteredUsers && filteredUsers.length > 0 ? (
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {filteredUsers.map((user) => (
                <li
                  key={user.id} // Asegúrate de que el 'id' sea único y esté disponible
                  className="fs-1"
                  onClick={() => handleUserClick(user.id)} // Redirige al perfil del usuario
                  style={{ cursor: "pointer" }} // Cambia el cursor al pasar sobre el elemento
                >
                  {user.username}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-light fs-1 mt-5">No se encontraron usuarios.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
