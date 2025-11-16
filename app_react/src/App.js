import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import UsuarioPage from "./pages/UsuarioPage";
import ProductoPage from "./pages/ProductoPage";
import ServicioPage from "./pages/ServicioPage";
import LoginPage from "./pages/LoginPage";
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {

  // 1️⃣ Estado que controla si hay sesión
  const [isLogged, setIsLogged] = useState(() => {
    const token = localStorage.getItem("token");
    return token && token !== "null" && token !== "undefined";
  });

  // 2️⃣ Limpia tokens inválidos al iniciar la app
useEffect(() => {
  localStorage.removeItem("token");
}, []);

  // 3️⃣ Aquí ya va tu return original
  return (
    <Router>

      {isLogged && (
        <nav style={{ padding: "10px", background: "#eee" }}>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/servicios">Servicios</Link>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<LoginPage setIsLogged={setIsLogged} />} />

        <Route path="/usuarios" element={<UsuarioPage />} />
        <Route path="/productos" element={<ProductoPage />} />
        <Route path="/servicios" element={<ServicioPage />} />


        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    
  );
}