import React, { useState, useEffect } from "react";
function ProductoForm({ productToEdit, onSaveComplete }) {

  const [name, setName] = useState("");
  const [product_type, setProducto_type] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setProducto_type(productToEdit.product_type);
      setPrice(productToEdit.price);
    } else {
      setName("");
      setProducto_type("");
      setPrice("");
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProducto = { name, product_type, price };

    const method = productToEdit ? "PUT" : "POST";
    const url = productToEdit
      ? `http://localhost:3000/api/app_web/productos/${productToEdit._id}`
      : "http://localhost:3000/api/app_web/productos";


    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProducto),
    })
      .then((res) => res.json())
      .then(() => {
        alert(
          productToEdit
            ? `Producto ${name} actualizado`
            : `Producto ${name} creado`
        );

        onSaveComplete();
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Título dinámico del formulario */}
      <h2>{productToEdit ? "Editar Productoo" : "Agregar Productoo"}</h2>

      {/* Campo de texto: Nombre */}
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Campo de texto: Email */}
      <input
        type="text"
        placeholder="Categoría"
        value={product_type}
        onChange={(e) => setProducto_type(e.target.value)}
        required
      />

      {/* Campo de texto: Precio */}
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      {/* Botón dinámico (cambia texto según acción) */}
      <button type="submit">
        {productToEdit ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}


export default ProductoForm;
