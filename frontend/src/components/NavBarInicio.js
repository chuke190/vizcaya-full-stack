import React from "react";
import "../styles/NavBarInicio.css";
import logoInDas from "../assets/logoDentalViscaya.png";
import "../styles/Nav.css"; // Asegúrate de tener los estilos correspondientes


const NavBarInicio = () => {
  return (
    <div className="navbar-inicio">
      <img src={logoInDas} alt="Logo" className="navbar-logoInDas" />
    </div>
  );
};

export default NavBarInicio;
