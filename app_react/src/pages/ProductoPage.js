import React, { useState } from "react";
import ProductoForm from "../components/ProductoForm";
import ProductoList from "../components/ProductoList";

export default function ProductoPage() {
  const [selectedProducto, setSelectedProducto] = useState(null);

  const handleEdit = (product) => setSelectedProducto(product);
  const handleSaveComplete = () => setSelectedProducto(null);

  return (
    <div style={{ margin: "20px" }}>
      <h1>Gestión de Productos</h1>

      <ProductoForm
        productToEdit={selectedProducto}
        onSaveComplete={handleSaveComplete}
      />

      <hr />

      <ProductoList onEdit={handleEdit} />
    </div>
  );
}