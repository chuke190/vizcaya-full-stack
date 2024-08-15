import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../styles/AgregarMedicos.css"; 

const EditarMedico = ({ medicos, setMedicos }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [medicoData, setMedicoData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    especialidad: "",
    direccion: "",
    email: "",
    telefono: "",
  });
  const [especialidades, setEspecialidades] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const medico = medicos.find((medico) => medico.id === parseInt(id));
    if (medico) {
      setMedicoData({
        nombres: medico.nombre,
        apellidos: medico.apellido,
        dni: medico.dni,
        especialidad: medico.especialidad_id,
        direccion: medico.direccion,
        email: medico.email,
        telefono: medico.telefono,
      });
    } else {
      navigate("/medicos");
    }
  }, [id, medicos, navigate]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch(
          "http://localhost/sisDenatal/backend2/public/index.php?action=getespecialidades"
        );
        const data = await response.json();
        setEspecialidades(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchEspecialidades();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicoData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEspecialidadChange = (e) => {
    setMedicoData((prevState) => ({
      ...prevState,
      especialidad: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost/sisDenatal/backend2/public/index.php?action=updatemedico",
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id, 
          nombre: medicoData.nombres,
          apellido: medicoData.apellidos,
          dni: medicoData.dni,
          especialidad_id: medicoData.especialidad,
          direccion: medicoData.direccion,
          email: medicoData.email,
          telefono: medicoData.telefono,
        }),
      }
    );
    const data = await response.json();
    if (data.message === "exito") {
      setMedicos((prevMedicos) =>
        prevMedicos.map((medico) =>
          medico.id === parseInt(id)
            ? { ...medico, ...medicoData, id: parseInt(id) }
            : medico
        )
      );
      navigate("/medicos");
    } else {
      setError(data.message);
    }
  };

  const handleCancel = () => {
    navigate("/medicos");
  };

  return medicoData ? (
    <div className="addmedico-body">
      <div className="agregar-medico-container">
        <div className="header">
          <h2>Editar Médico</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={handleCancel}
          />
        </div>
        <form onSubmit={handleSubmit} className="formed">
          <div className="form-table">
            <div className="form-group">
              <label htmlFor="nombres">Nombres:</label>
              <input
                type="text"
                id="nombres"
                name="nombres"
                value={medicoData.nombres}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellidos">Apellidos:</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={medicoData.apellidos}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dni">DNI:</label>
              <input
                type="text"
                id="dni"
                name="dni"
                value={medicoData.dni}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="especialidad">Especialidad:</label>
              <select
                id="especialidad"
                name="especialidad"
                value={medicoData.especialidad}
                onChange={handleEspecialidadChange}
                required
              >
                <option value="">Seleccionar especialidad</option>
                {especialidades.map((especialidad) => (
                  <option key={especialidad.id} value={especialidad.id}>
                    {especialidad.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="direccion">Dirección:</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={medicoData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={medicoData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={medicoData.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
            <button
              type="button"
              className="btn-cancelar"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  ) : (
    <div>Cargando...</div>
  );
};

export default EditarMedico;
