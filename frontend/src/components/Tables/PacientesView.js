import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import HistorialClinicoModal from "../HistorialClinicoModal";
import "../../styles/PacientesView.css";
import Nav from "../Nav";

const PacientesView = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const pacientes = location.state ? location.state.pacientes : [];

  const handleOpenModal = (paciente) => {
    setSelectedPaciente(paciente);
  };

  const handleCloseModal = () => {
    setSelectedPaciente(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="viewbody">
      <Nav />
      <div className="historial-citas-header">
        <div className="search-bar-pv">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon-pv" />
        </div>
      </div>
      <div className="pacientes-view">
        <h1>Listado de Pacientes</h1>
        <p className="patient-count">
          Número de Pacientes Procesados: {filteredPacientes.length}
        </p>
        <table className="view-table">
          <thead>
            <tr>
              <th>Doc. Identidad</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Foto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredPacientes.length ? (
              filteredPacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td>{paciente.docIdentidad}</td>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.email}</td>
                  <td>{paciente.telefono}</td>
                  <td>
                    {paciente.photo ? (
                      <img
                        src={paciente.photo}
                        alt="Foto"
                        className="user-photo"
                      />
                    ) : (
                      "No disponible"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn-details"
                      onClick={() => handleOpenModal(paciente)}
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay pacientes disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>

        {selectedPaciente && (
          <HistorialClinicoModal
            paciente={selectedPaciente}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default PacientesView;
