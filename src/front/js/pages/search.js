import React, { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Context } from "../store/appContext";

export const Search = () => {
  const { store, actions } = useContext(Context);
  const [ filteredUsers, setFilteredUsers] = useState([])

  // const [user, setUser] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // const [debounceValue] = useDebounce(inputValue, 300);

  

  // Función para manejar cambios en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Actualizamos inputValue
    // setUser(value); // Actualizamos searchTerm
  };

   // Carga inicial de todos los usuarios
   useEffect(() => {
    // Llamar a getAllUsers al montar el componente
    actions.getAllUsers().catch((error) =>
      console.error("Error al obtener todos los usuarios:", error)
    );
  }, []);

  useEffect(() => {
    // Solo hacer la búsqueda si hay un término de búsqueda
    if (inputValue) {
      // actions.getFilterUser(inputValue)
      
      setFilteredUsers(actions.getFilterUser(inputValue))
    } else {
      // Si no hay un término de búsqueda, carga todos los usuarios
      actions.getAllUsers()
        .catch(error => console.error("Error al obtener todos los usuarios:", error));
    }
  }, [inputValue]);

  // Determinar qué usuarios mostrar
  // const usersToShow = inputValue ?    store.users : store.listuser ;


  return (
    <div
      className="d-flex justify-content-center"
      style={{
        paddingTop: "20px",
        minHeight: "100vh", // Asegura que el fondo cubra toda la altura de la pantalla
        background: "linear-gradient(to bottom, #003366, #66ccff)", // Gradiente azul
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
            value={inputValue}
            onChange={handleInputChange} // Usamos handleInputChange aquí
            placeholder="Buscar..."
            className="form-control"
          />
          <button
            className="btn btn-secondary"
            onClick={() => actions.getFilterUser(inputValue)} // Realiza la búsqueda al hacer clic
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
              {filteredUsers.map((user, index) => (
                <li key={index} className="fs-1">{user.username}</li> // Asegúrate de que 'name' sea un atributo de los usuarios
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

