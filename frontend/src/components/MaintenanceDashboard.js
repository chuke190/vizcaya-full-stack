import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MaintenanceDashboard.css';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faClock, faCog } from '@fortawesome/free-solid-svg-icons';

const MaintenanceDashboard = () => {
  return (
    <div className="maintenance-body">
      <Nav />
      <div className="maintenance-dashboard">
        <h1>Mantenimiento de Agenda</h1>
        <div className="dashboard-summary">
          <div className="summary-card">
            <h4>Agregar Cita</h4>
            <FontAwesomeIcon icon={faPlus} className="card-icon-m" />
            <Link to="/mantenimiento/add-appointment">
              <button className="btn-view-md">Agregar</button>
            </Link>
          </div>
          <div className="summary-card"> 
            <h4>Editar Cita</h4>
            <FontAwesomeIcon icon={faEdit} className="card-icon-m" />
            <Link to="/mantenimiento/edit-appointment">
              <button className="btn-view-md">Editar</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;
