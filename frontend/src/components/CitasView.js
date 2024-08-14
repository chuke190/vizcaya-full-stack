import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/CitasView.css'; // Asegúrate de que este archivo CSS exista y contenga los estilos necesarios
import Nav from './Nav';

const CitasView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const citasData = location.state ? location.state.citas : [];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCita, setSelectedCita] = useState(null); // Estado para manejar la cita seleccionada

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleVerPago = (cita) => {
    navigate(`/ver-pago/${cita.id}`, { state: { citaSeleccionada: cita } });
};
  const handleCloseModal = () => {
    setSelectedCita(null);
  };

  return (
    <div className="viewbody">
        <Nav/>
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

      <div className="citas-view">
        <h1>Listado de Citas</h1>
        <p className="citas-count">Número de Citas Procesadas: {citasData.length}</p>
        <table className="view-table">
          <thead>
            <tr>
              <th>Tratamiento</th>
              <th>Médico</th>
              <th>Paciente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Costo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasData.length ? (
              citasData.filter(cita => 
                cita.tratamiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cita.medico.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cita.paciente.toLowerCase().includes(searchTerm.toLowerCase())
              ).map(cita => (
                <tr key={cita.id}>
                  <td>{cita.tratamiento}</td>
                  <td>{cita.medico}</td>
                  <td>{cita.paciente}</td>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  <td>{cita.costo}</td>
                  <td>{cita.estado}</td>
                  <td>
                  <button className="btn-ver-pago-h" onClick={() => handleVerPago(cita)}>Ver Pago</button>                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No hay citas disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CitasView;
