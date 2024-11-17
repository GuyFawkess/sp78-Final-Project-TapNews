// import React, { useContext, useEffect, useState } from "react";
// import { useDebounce } from "use-debounce";
// import { Context } from "../store/appContext";

// export const Search = () => {
//   const { store, actions } = useContext(Context);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [inputValue, setInputValue] = useState("");
//   const [debounceValue] = useDebounce(inputValue, 500); // Añadimos un retraso de 500ms

//   // Función para manejar cambios en el input
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value); // Actualizamos inputValue
//     setSearchTerm(value); // Actualizamos searchTerm
//   };

//   // useEffect para realizar la búsqueda con debounce
//   useEffect(() => {
//     if (debounceValue) {
//       console.log("Buscando usuarios:", debounceValue);
//       actions.getFilterUser(debounceValue);
//     }
//   }, [debounceValue, actions]);

//   return (
//     <div
//       className="d-flex justify-content-center"
//       style={{
//         paddingTop: "20px",
//         minHeight: "100vh", // Asegura que el fondo cubra toda la altura de la pantalla
//         background: "linear-gradient(to bottom, #003366, #66ccff)", // Gradiente azul de oscuro a claro
//       }}
//     >
//       <div
//         className="text-center"
//         style={{ width: "100%", maxWidth: "500px", paddingLeft: "10px", paddingRight: "10px" }}
//       >
//         <h1 className="text-center mb-3 text-light">Búsqueda de Usuarios</h1>

//         {/* Grupo de entrada de Bootstrap con ícono y márgenes uniformes */}
//         <div className="input-group mb-3">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleInputChange} // Usamos handleInputChange aquí
//             placeholder="Buscar..."
//             className="form-control"
//           />
//           <button
//             className="btn btn-outline-secondary"
//             onClick={() => actions.getFilterUser(searchTerm)} // Realiza la búsqueda al hacer clic
//             style={{
//               borderTopLeftRadius: "0",
//               borderBottomLeftRadius: "0",
//               padding: "0.5rem 1rem",
//             }}
//           >
//             <i className="fa-solid fa-magnifying-glass text-light"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;

import React, { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Context } from "../store/appContext";

export const Search = () => {
  const { store, actions } = useContext(Context);

  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [debounceValue] = useDebounce(inputValue); // Retraso de 500ms

  // Función para manejar cambios en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Actualizamos inputValue
    setSearchTerm(value); // Actualizamos searchTerm
  };

  // useEffect para realizar la búsqueda con debounce
  useEffect(() => {
    if (debounceValue) {
      console.log("Buscando usuarios:", debounceValue);
      // Llamada a la acción para filtrar los usuarios
      actions.getFilterUser(debounceValue);  // Asegúrate de que esta acción esté correctamente definida
    }
  }, [debounceValue, actions]);

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
            value={searchTerm}
            onChange={handleInputChange} // Usamos handleInputChange aquí
            placeholder="Buscar..."
            className="form-control"
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => actions.getFilterUser(searchTerm)} // Realiza la búsqueda al hacer clic
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
        <div className="user-list">
          {store.users && store.users.length > 0 ? (
            <ul>
              {store.users.map((user, index) => (
                <li key={index}>{user.name}</li> // Asegúrate de que 'name' sea un atributo de los usuarios
              ))}
            </ul>
          ) : (
            <p className="text-light">No se encontraron usuarios.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
