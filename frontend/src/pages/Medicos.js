import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Medicos.css";
import Nav from "../components/Nav";

const Medicos = ({ medicos, setMedicos }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicos, setFilteredMedicos] = useState([]);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await fetch(
          "http://localhost/vizcaya-full-stack/backend2/public/index.php?action=getmedicos"
        );
        const data = await response.json();
        setMedicos(data); 
        setFilteredMedicos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchMedicos();
  }, [setMedicos]);

  useEffect(() => {
    setFilteredMedicos(
      medicos.filter(
        (medico) =>
          medico.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          medico.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, medicos]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddMedico = () => {
    navigate("/agregar-medicos");
  };

  const handleEditMedico = (id) => {
    navigate(`/editar-medico/${id}`);
  };

  const handleDeleteMedico = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este médico?")) {
      const deleteMedico = async () => {
        try {
          const response = await fetch(
            "http://localhost/vizcaya-full-stack/backend2/public/index.php?action=deletemedico",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id }),
            }
          );
          const data = await response.json();
          setMedicos(medicos.filter((medico) => medico.id !== id));
          setFilteredMedicos(medicos.filter((medico) => medico.id !== id));
        } catch (error) {
          console.error("Error:", error);
        }
      };
      deleteMedico();
    }
  };

  return (
    <div className="medicos-body">
      <Nav />
      <div className="medicos-header">
        <button className="btn-back-me" onClick={() => navigate("/dashboard")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="btn-add-me" onClick={handleAddMedico}>
          <FontAwesomeIcon icon={faPlus} /> Agregar Médico
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
      <div className="medicos-container">
        <table className="medicos-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Especialidad</th>
              <th>Dirección</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicos.map((medico) => (
              <tr key={medico.id}>
                <td>{medico.id}</td>
                <td>{medico.nombre}</td>
                <td>{medico.dni}</td>
                <td>{medico.especialidad_nombre}</td>
                <td>{medico.direccion}</td>
                <td>{medico.email}</td>
                <td>{medico.telefono}</td>
                <td>
                  <button
                    className="btn-edit-m"
                    onClick={() => handleEditMedico(medico.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete-m"
                    onClick={() => handleDeleteMedico(medico.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medicos;
