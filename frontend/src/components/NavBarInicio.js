import React from "react";
import "../styles/NavBarInicio.css";
import logoInDas from "../assets/logoDentalViscaya.png";

const NavBarInicio = () => {
  return (
    <div className="navbar-inicio">
      <img src={logoInDas} alt="Logo" className="navbar-logoInDas" />
    </div>
  );
};

export default NavBarInicio;
