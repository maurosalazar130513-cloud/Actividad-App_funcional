import React, { useEffect, useState } from "react";

function ServicioList({ onEdit }) {
  const [servicios, setServicios] = useState([]);

  const fetchServicios = () => {
    fetch("http://localhost:3000/api/app_web/servicios")
      .then((res) => res.json()) // Convertimos la respuesta a JSON
      .then((data) => setServicios(data)) // Guardamos los empleados en el estado
      .catch((err) => console.error("Error:", err)); // Mostramos errores si ocurren
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro que deseas eliminar este servicioo?")) return;

    fetch(`http://localhost:3000/api/app_web/servicios/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Servicio eliminado"); // Mensaje de confirmación
        fetchServicios(); // Recargamos la lista para reflejar el cambio
      })
      .catch((err) => console.error("Error al eliminar:", err));
  };

  return (
    <div>
      <h2>Lista de Servicios</h2>

      {servicios.length === 0 ? (
        <p>No hay servicioos registrados.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Precio</th>
            </tr>
          </thead>

          <tbody>
            {servicios.map((emp) => (
              // Cada fila debe tener una key única (usamos emp._id o emp.id)
              <tr key={emp._id || emp.id}>
                <td>{emp.name}</td>
                <td>{emp.service_type}</td>
                <td>{emp.price}</td>
                <td>
                  <button onClick={() => onEdit(emp)}>Editar</button>

                  <button
                    onClick={() => handleDelete(emp._id || emp.id)}
                    style={{ marginLeft: "10px" }} // Espacio visual entre botones
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ServicioList;
