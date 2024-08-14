// Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logoDentalViscaya.png'; 
import '../styles/Nav.css'; // Asegúrate de tener los estilos correspondientes

const Nav = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo de la empresa" />
            </div>
            <ul className="nav-links">
                <li><Link to="/dashboard">Inicio</Link></li>
                <li><Link to="/mantenimiento">Mantenimiento</Link></li>
                <li><Link to="/citas">Citas</Link></li>
                <li><Link to="/historial-citas">Historial Citas</Link></li>
                <li><Link to="/calendario">Calendario</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </nav>
        
    );
};

export default Nav;
