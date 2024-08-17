import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css'; // Estilos opcionales para la carta

const CardL = ({ icon, title, link }) => {

    function logout() {
        localStorage.clear();
        window.location.href = "/";
    }
    
    return (
        <Link onClick={logout} className="card">
            <div className="card-icon">{icon}</div>
            <div className="card-title">{title}</div>
        </Link>
    );
};

export default CardL;
