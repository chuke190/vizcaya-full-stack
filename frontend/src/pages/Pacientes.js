import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Pacientes.css";
import Nav from "../components/Nav";
import HistorialClinicoModal from "../components/HistorialClinicoModal";

const Pacientes = ({ pacientesData, setPacientesData }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch(
          "http://localhost/sisDenatal/backend2/public/index.php?action=getpacientes"
        );
        const data = await response.json();
        setPacientesData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPacientes();
  }, [setPacientesData]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddPaciente = () => {
    navigate("/agregar-paciente");
  };

  const handleEditPaciente = (id) => {
    navigate(`/editar-paciente/${id}`);
  };

  const handleDeletePaciente = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
      const deletePaciente = async () => {
        try {
          const response = await fetch(
            "http://localhost/sisDenatal/backend2/public/index.php?action=deletepaciente",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id }),
            }
          );
          const data = await response.json();
          console.log(data);
          setPacientesData(
            pacientesData.filter((pacientesData) => pacientesData.id !== id)
          );
          setFilteredPacientes(
            pacientesData.filter((pacientesData) => pacientesData.id !== id)
          );
        } catch (error) {
          console.error("Error:", error);
        }
      };
      deletePaciente();
    }
  };

  const handleViewDetails = () => {
    navigate("/admin/pacientes", { state: { pacientes: pacientesData } });
  };

  const handleViewHistorial = (id) => {
    const paciente = pacientesData.find((p) => p.id === id);
    setSelectedPaciente(paciente);
  };

  const closeModal = () => {
    setSelectedPaciente(null);
  };

  return (
    <div className="usuarios-body">
      <Nav />
      <div className="usuarios-header">
        <button className="btn-back-pas" onClick={() => navigate("/dashboard")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="btn-add" onClick={handleAddPaciente}>
          <FontAwesomeIcon icon={faPlus} /> Agregar Paciente
        </button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <p>Cargando...</p>
        </div>
      ) : (
        <div className="usuarios-container">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Encargado</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientesData
                .filter(
                  (paciente) =>
                    paciente.nombre
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    paciente.email
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map((paciente) => (
                  <tr key={paciente.id}>
                    <td>{paciente.encargado}</td>
                    <td>{paciente.nombre}</td>
                    <td>{paciente.email}</td>
                    <td>{paciente.telefono}</td>
                    <td>
                      <div className="opciones-container">
                        <button
                          className="btn-view-p"
                          onClick={() => handleViewHistorial(paciente.id)}
                        >
                          Ver
                        </button>
                        <button
                          className="btn-editt"
                          onClick={() => handleEditPaciente(paciente.id)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn-deletee"
                          onClick={() => handleDeletePaciente(paciente.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {selectedPaciente && (
            <HistorialClinicoModal
              paciente={selectedPaciente}
              onClose={closeModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Pacientes;
