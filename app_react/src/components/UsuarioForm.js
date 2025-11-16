import React, { useState, useEffect } from "react";
function UsuarioForm({ usuarioToEdit, onSaveComplete }) {

  const [nombre, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [office, setOffice] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    if (usuarioToEdit) {
      // Precargar datos del empleado seleccionado
      setName(usuarioToEdit.nombre);
      setEmail(usuarioToEdit.email);
      setPassword(usuarioToEdit.password);
      setOffice(usuarioToEdit.office);
      setPosition(usuarioToEdit.position);
      setSalary(usuarioToEdit.salary);
    } else {
      // Limpiar el formulario para crear uno nuevo
      setName("");
      setEmail("");
      setPassword("");
      setOffice("");
      setPosition("");
      setSalary("");
    }
  }, [usuarioToEdit]); // Se vuelve a ejecutar si cambia usuarioToEdit

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página por defecto.

    const newUsuario = { nombre, position, office, salary, email, password};

    const method = usuarioToEdit ? "PUT" : "POST";
    const url = usuarioToEdit
      ? `http://localhost:3000/api/app_web/usuarios/${usuarioToEdit._id}` // Actualizar
      : "http://localhost:3000/api/app_web/usuarios"; // Crear nuevo

    fetch(url, {
      method, // PUT o POST según el caso
      headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo es JSON
      body: JSON.stringify(newUsuario), // Convertimos el objeto a texto JSON
    })
      .then((res) => res.json()) // Convertimos la respuesta a formato JSON
      .then(() => {
        // Mostramos un mensaje al usuario
        alert(
          usuarioToEdit
            ? `Usuario ${nombre} actualizado`
            : `Usuario ${nombre} creado`
        );

        onSaveComplete();
      })
      .catch((err) => console.error("Error:", err)); // Captura y muestra errores en consola
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Título dinámico del formulario */}
      <h2>{usuarioToEdit ? "Editar Usuario" : "Agregar Usuario"}</h2>

      {/* Campo de texto: Nombre */}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Campo de texto: Email */}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Campo de texto: Password */}
      <input
        type="text"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Campo de texto: Oficina */}
      <input
        type="text"
        placeholder="Oficina"
        value={office}
        onChange={(e) => setOffice(e.target.value)}
        required
      />


      {/* Campo de texto: Posición */}
      <input
        type="text"
        placeholder="Posición"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />


      {/* Campo numérico: Salario */}
      <input
        type="number"
        placeholder="Salario"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        required
      />

      {/* Botón dinámico (cambia texto según acción) */}
      <button type="submit">
        {usuarioToEdit ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

// Exportamos el componente para que pueda ser importado en otros archivos
export default UsuarioForm;
