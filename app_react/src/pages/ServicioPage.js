import React, { useState } from "react";
import ServicioForm from "../components/ServicioForm";
import ServicioList from "../components/ServicioList";

export default function ServicioPage() {
  const [selectedServicio, setSelectedServicio] = useState(null);

  const handleEdit = (servicio) => setSelectedServicio(servicio);
  const handleSaveComplete = () => setSelectedServicio(null);

  return (
    <div style={{ margin: "20px" }}>
      <h1>Gestión de Servicios</h1>

      <ServicioForm
        servicioToEdit={selectedServicio}
        onSaveComplete={handleSaveComplete}
      />

      <hr />

      <ServicioList onEdit={handleEdit} />
    </div>
  );
}