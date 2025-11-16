import React, { useState } from "react";
import UsuarioForm from "../components/UsuarioForm";
import UsuarioList from "../components/UsuarioList";

export default function UsuarioPage() {
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  const handleEdit = (usuario) => setSelectedUsuario(usuario);
  const handleSaveComplete = () => setSelectedUsuario(null);

  return (
    <div style={{ margin: "20px" }}>
      <h1>Gestión de Usuarios</h1>

      <UsuarioForm usuarioToEdit={selectedUsuario} onSaveComplete={handleSaveComplete} />

      <hr />

      <UsuarioList onEdit={handleEdit} />
    </div>
  );
}

