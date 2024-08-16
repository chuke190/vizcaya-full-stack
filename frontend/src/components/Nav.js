// Nav.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoDentalViscaya.png";
import "../styles/Nav.css"; // Asegúrate de tener los estilos correspondientes

function cerrarSesion() {
  localStorage.removeItem("usuarioLogged");
  window.location.href = "/";
}

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo de la empresa" />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/dashboard">Inicio</Link>
        </li>
        <li>
          <Link to="/pagos">Pagos</Link>
        </li>
        <li>
          <Link to="/citas">Citas</Link>
        </li>
        <li>
          <Link to="/historial-citas">Historial Citas</Link>
        </li>
        <li>
          <Link to="/calendario">Calendario</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link onClick={cerrarSesion}>Cerrar sesión</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
