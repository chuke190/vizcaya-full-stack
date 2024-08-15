import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/MedicosDetalles.css'; // Asegúrate de que este archivo CSS exista y contenga los estilos necesarios
import Nav from './Nav';

const MedicosDetalles = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const medicos = location.state? location.state.medicos : [];
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedicos, setFilteredMedicos] = useState([]);

  useEffect(() => {
    setFilteredMedicos(
      medicos.filter(medico =>
        medico.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medico.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, medicos]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="viewbody">
      <Nav />
      <div className="historial-citas-header">
        <div className="search-bar-cv">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon-cv" />
        </div>
      </div>
      <div className="medicos-view">
        <h1>Listado de Médicos</h1>
        <p className="medicos-count">Total de Médicos Registrados: {medicos.length}</p>
        <table className="view-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Especialidad</th>
              <th>Dirección</th>
              <th>Email</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicos.length ? (
              filteredMedicos.map(medico => (
                <tr key={medico.id}>
                  <td>{medico.nombre}</td>
                  <td>{medico.dni}</td>
                  <td>{medico.especialidad_nombre}</td>
                  <td>{medico.direccion}</td>
                  <td>{medico.email}</td>
                  <td>{medico.telefono}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay médicos disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicosDetalles;
