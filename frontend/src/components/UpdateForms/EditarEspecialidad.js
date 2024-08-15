import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../styles/AgregarEspecialidades.css";

const EditarEspecialidad = ({ especialidadesData, setEspecialidadesData }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [especialidadData, setEspecialidadData] = useState(null);

  useEffect(() => {
    const especialidad = especialidadesData.find(
      (especialidad) => especialidad.id === parseInt(id)
    );
    if (especialidad) {
      setEspecialidadData(especialidad);
    } else {
      navigate("/especialidades");
    }
    console.log(especialidad);
  }, [id, especialidadesData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEspecialidadData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!especialidadData.nombre) {
      return;
    }
    const response = await fetch(
      `http://localhost/vizcaya-full-stack/backend2/public/index.php?action=updateespecialidad`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(especialidadData),
      }
    );
    const data = await response.json();
    console.log(data);

    if (data.message === "exito") {
      const updatedEspecialidadesData = especialidadesData.map(
        (especialidad) => {
          if (especialidad.id === especialidadData.id) {
            return especialidadData;
          }
          return especialidad;
        }
      );
      setEspecialidadesData(updatedEspecialidadesData);
      navigate("/especialidades");
    } else {
      alert("Error al actualizar la especialidad");
    }
  };

  const handleCancel = () => {
    navigate("/especialidades");
  };

  if (!especialidadData) {
    return null;
  }

  return (
    <div className="addusua-body">
      <div className="agregar-usuario-container">
        <div className="header">
          <h2>Editar Especialidad</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={() => navigate("/especialidades")}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-table">
            <div className="form-group">
              <label htmlFor="nombre">Especialidad:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={especialidadData.nombre}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="button-group-es">
            <button type="submit" className="btn-guardar-es">
              Guardar
            </button>
            <button
              type="button"
              className="btn-cancelar-es"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarEspecialidad;
