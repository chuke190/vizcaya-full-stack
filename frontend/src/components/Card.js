import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css'; // Estilos opcionales para la carta

const Card = ({ icon, title, link }) => {
    return (
        <Link to={link} className="card">
            <div className="card-icon">{icon}</div>
            <div className="card-title">{title}</div>
        </Link>
    );
};

export default Card;
