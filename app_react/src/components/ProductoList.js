import React, { useEffect, useState } from "react";

function ProductoList({ onEdit }) {
  const [productos, setProductos] = useState([]);

  const fetchProductos = () => {
    fetch("http://localhost:3000/api/app_web/productos")
      .then((res) => res.json()) // Convertimos la respuesta a JSON
      .then((data) => setProductos(data)) // Guardamos los empleados en el estado
      .catch((err) => console.error("Error:", err)); // Mostramos errores si ocurren
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro que deseas eliminar este producto?")) return;

    fetch(`http://localhost:3000/api/app_web/productos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Producto eliminado"); // Mensaje de confirmación
        fetchProductos(); // Recargamos la lista para reflejar el cambio
      })
      .catch((err) => console.error("Error al eliminar:", err));
  };

  return (
    <div>
      <h2>Lista de Productos</h2>

      {/* Si no hay empleados, mostrar un mensaje */}
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
            </tr>
          </thead>

          <tbody>
            {/* Recorremos el arreglo de empleados */}
            {productos.map((emp) => (
              // Cada fila debe tener una key única (usamos emp._id o emp.id)
              <tr key={emp._id || emp.id}>
                <td>{emp.name}</td>
                <td>{emp.product_type}</td>
                <td>{emp.price}</td>
                <td>
                  {/* Botón Editar: llama a onEdit pasando el empleado seleccionado */}
                  <button onClick={() => onEdit(emp)}>Editar</button>

                  {/* Botón Eliminar: llama a handleDelete con el ID del empleado */}
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

export default ProductoList;
