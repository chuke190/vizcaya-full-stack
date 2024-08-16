import React from "react";
import "../styles/NavBarInicio.css";
import logoInDas from "../assets/logoDentalViscaya.png";
import "../styles/Nav.css"; // Asegúrate de tener los estilos correspondientes


const NavBarInicio = () => {
  return (
    <div className="navbar-inicio">
      <img src={logoInDas} alt="Logo" className="navbar-logoInDas" />
      <h1 className="navbar-title">Dental Viscaya</h1>
    </div>
  );
};

export default NavBarInicio;
