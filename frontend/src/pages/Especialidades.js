import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Especialidades.css";
import Nav from "../components/Nav";

const Especialidades = ({ especialidadesData, setEspecialidadesData }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEspecialidades, setSelectedEspecialidades] = useState([]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch(
          "http://localhost/sisDenatal/backend2/public/index.php?action=getespecialidades"
        );
        const data = await response.json();
        setEspecialidadesData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchEspecialidades();
  }, [setEspecialidadesData]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddEspecialidad = () => {
    navigate("/agregar-especialidades"); // Navegar a una página para agregar especialidad
  };

  const handleEditEspecialidad = (id) => {
    navigate(`/editar-especialidades/${id}`); // Navegar a una página para editar especialidad
  };

  const handleDeleteEspecialidad = (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta especialidad?")
    ) {
      const deleteEspecialidad = async () => {
        try {
          const response = await fetch(
            "http://localhost/sisDenatal/backend2/public/index.php?action=deleteespecialidad",
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
          setEspecialidadesData(
            especialidadesData.filter((especialidad) => especialidad.id !== id)
          );
        } catch (error) {
          console.error("Error:", error);
        }
      };
      deleteEspecialidad();
    }
  };

  const handleDeleteSelected = () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar las especialidades seleccionadas?"
      )
    ) {
    }
  };

  const handleDeleteAll = () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar todas las especialidades?"
      )
    ) {
      const deleteAllEspecialidades = async () => {
        try {
          const response = await fetch(
            "http://localhost/sisDenatal/backend2/public/index.php?action=dropallesp",
            {
              method: "DELETE",
            }
          );
          const data = await response.json();
          console.log(data);
          setEspecialidadesData([]);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      deleteAllEspecialidades();
    }
  };

  const handleSelectEspecialidad = (id) => {
    setSelectedEspecialidades((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((especialidadId) => especialidadId !== id)
        : [...prevSelected, id]
    );
    console.log(selectedEspecialidades);
  };

  return (
    <div className="especialidades-body">
      <Nav />
      <div className="especialidades-header">
        <div className="especialidades-header-left">
          <button className="botn-back" onClick={() => navigate("/dashboard")}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className="botn-add" onClick={handleAddEspecialidad}>
            <FontAwesomeIcon icon={faPlus} /> Agregar Especialidad
          </button>
        </div>
        <div className="especialidades-header-right">
          <div className="search-bar-e">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
          <button className="botn-delete-all" onClick={handleDeleteAll}>
            <FontAwesomeIcon icon={faTrash} /> Eliminar Todo
          </button>
        </div>
      </div>

      <div className="especialidades-container">
        <table className="especialidades-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {especialidadesData
              .filter((especialidad) =>
                especialidad.nombre
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((especialidad, index) => (
                <tr key={especialidad.id}>
                  <td>{index + 1}</td>
                  <td>{especialidad.nombre}</td>
                  <td>
                    <button
                      className="botn-edit"
                      onClick={() => handleEditEspecialidad(especialidad.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="botn-delete"
                      onClick={() => handleDeleteEspecialidad(especialidad.id)}
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

export default Especialidades;
