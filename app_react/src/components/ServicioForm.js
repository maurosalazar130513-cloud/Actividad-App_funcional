// Importamos React y los hooks necesarios desde la biblioteca
import React, { useState, useEffect } from "react";

function ServicioForm({ servicioToEdit, onSaveComplete }) {

  const [name, setName] = useState("");
  const [service_type, setService_type] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (servicioToEdit) {
      // Precargar datos del empleado seleccionado
      setName(servicioToEdit.name);
      setService_type(servicioToEdit.service_type);
      setPrice(servicioToEdit.price);
    } else {
      // Limpiar el formulario para crear uno nuevo
      setName("");
      setService_type("");
      setPrice("");
    }
  }, [servicioToEdit]); // Se vuelve a ejecutar si cambia servicioToEdit

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página por defecto.

    const newService = { name, service_type, price };

    const method = servicioToEdit ? "PUT" : "POST";
    const url = servicioToEdit
      ? `http://localhost:3000/api/app_web/servicios/${servicioToEdit._id}` // Actualizar
      : "http://localhost:3000/api/app_web/servicios"; // Crear nuevo

    // -------------------- PETICIÓN FETCH --------------------
    // Enviamos los datos al backend (Node.js / Express)
    fetch(url, {
      method, // PUT o POST según el caso
      headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo es JSON
      body: JSON.stringify(newService), // Convertimos el objeto a texto JSON
    })
      .then((res) => res.json()) // Convertimos la respuesta a formato JSON
      .then(() => {
        // Mostramos un mensaje al usuario
        alert(
          servicioToEdit
            ? `Servicio ${name} actualizado`
            : `Servicio ${name} creado`
        );

        // Notificamos al componente padre (por ejemplo, para refrescar la lista de empleados)
        onSaveComplete();
      })
      .catch((err) => console.error("Error:", err)); // Captura y muestra errores en consola
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Título dinámico del formulario */}
      <h2>{servicioToEdit ? "Editar Servicio" : "Agregar Servicio"}</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Categoría"
        value={service_type}
        onChange={(e) => setService_type(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <button type="submit">
        {servicioToEdit ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

export default ServicioForm;
