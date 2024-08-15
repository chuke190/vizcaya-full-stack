// src/components/Reportes.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserMd } from '@fortawesome/free-solid-svg-icons';
import '../styles/Reportes.css';
import Nav from '../components/Nav';

const Reportes = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="reporte-body">
            <Nav/>
            <div className="reportes-titulo">
                <h2>Opciones de Reportes</h2>
            </div>
            <div className="reportes-container">
                <div className="reportes-row">
                    <div className="reporte-card" onClick={() => handleNavigate('/reportes-paciente')}>
                         <FontAwesomeIcon icon={faUser} className="reporte-icon" />
                        <h3>Pacientes</h3>
                    </div>
                    <div className="reporte-card" onClick={() => handleNavigate('/reportes-medico')}>
                        <FontAwesomeIcon icon={faUserMd} className="reporte-icon" />
                        <h3>Médicos</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reportes;
