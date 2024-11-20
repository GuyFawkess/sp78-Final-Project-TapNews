import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Context } from "../store/appContext";

export const Search = () => {
  const { store, actions } = useContext(Context);
  const [filteredUsersWithProfiles, setFilteredUsersWithProfiles] = useState([]);
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
    actions.getAllProfiles().catch((error) =>
      console.error("Error al obtener los perfiles:", error)
    );
  }, [actions]);

  // Filtra los usuarios cuando inputValue cambia
  useEffect(() => {
    if (inputValue) {
      const filteredUsers = actions.getFilterUser(inputValue);
      if (Array.isArray(filteredUsers)) {
        const usersWithProfiles = filteredUsers.map((user) => {
          const profile = store.listprofile.find(profile => profile.user_id === user.id);
          return {
            ...user,
            profile: profile || {}  // Combina el usuario con su perfil, si existe
          };
        });
        setFilteredUsersWithProfiles(usersWithProfiles);
      }
    } else {
      setFilteredUsersWithProfiles([]);
    }
  }, [inputValue, actions, store.listuser, store.listprofile]);

  // Maneja el clic en un usuario para redirigir a su perfil
  const handleUserClick = (userId) => {
    navigate(`/search/${userId}`); // Redirige a la ruta del perfil del usuario
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
          {filteredUsersWithProfiles && filteredUsersWithProfiles.length > 0 ? (
            <div className="d-flex flex-column align-items-center gap-2">
              {filteredUsersWithProfiles.map((user) => (
                <button
                  key={user.id} // Asegúrate de que el 'id' sea único y esté disponible
                  className="fs-1 bg-primary rounded-5"
                  onClick={() => handleUserClick(user.id)} // Redirige al perfil del usuario
                  style={{
                    backgroundColor: "#4A90E2", // Un azul bonito
                    color: "white",
                    borderRadius: "10px",
                    padding: "0.5rem 1rem",
                    textAlign: "left",
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",  // Alinea el texto y la imagen de perfil
                    gap: "10px", // Espacio entre la imagen y el nombre
                  }}
                >
                  {/* Imagen de perfil del usuario */}
                  <img
                    src={user.profile.img_url || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg"} // Usa la URL de la imagen de perfil
                    alt={`${user.username}'s profile`}
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}  // Estilo de la imagen circular
                  />
                  <span>{user.username}</span>
                </button>
              ))}
            </div>
          ) : (
            inputValue && (
            <p className="text-light fs-1 mt-5">No se encontraron usuarios.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
