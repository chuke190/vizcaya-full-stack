import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../styles/AgregarCitas.css";

const EditarCita = ({ citasData, setCitasData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const citaToEdit = citasData.find((cita) => cita.id === parseInt(id));

  const [citaData, setCitaData] = useState(
    citaToEdit || {
      tratamiento: "",
      medico: "",
      paciente: "",
      fecha: "",
      hora: "",
      estado: "Pendiente",
      pago: "",
      costo: "",
      pagado: "No",
    }
  );

  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await fetch(
          "http://localhost/vizcaya-full-stack/backend2/public/index.php?action=getmedicos"
        );
        const data = await response.json();
        setMedicos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchMedicos();
  }, []);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch(
          "http://localhost/vizcaya-full-stack/backend2/public/index.php?action=getpacientes"
        );
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPacientes();
  }, []);

  useEffect(() => {
    const fetchTratamientos = async () => {
      try {
        const response = await fetch(
          "http://localhost/vizcaya-full-stack/backend2/public/index.php?action=gettratamientos"
        );
        const data = await response.json();
        setTratamientos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchTratamientos();
  }, []);

  useEffect(() => {
    if (citaToEdit) {
      setCitaData(citaToEdit);
    }
  }, [citaToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCitaData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateCita = async () => {
      try {
        const response = await fetch(
          "http://localhost/vizcaya-full-stack/backend2/public/index.php?action=updatecita",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              tratamiento: citaData.tratamiento,
              medico: citaData.medico,
              paciente: citaData.paciente,
              fecha: citaData.fecha,
              hora: citaData.hora,
              estado: citaData.estado,
              costo: citaData.costo,
              pagado: citaData.pagado,
            }),
          }
        );
        const data = await response.json();
        if (data.message === "exito") {
          setCitasData(
            citasData.map((cita) => {
              if (cita.id === parseInt(id)) {
                return { ...cita, ...citaData };
              }
              return cita;
            })
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    updateCita();
    navigate("/citas");
  };

  const handleCancel = () => {
    navigate("/citas");
  };

  return (
    <div className="addcita-body">
      <div className="agregar-cita-container">
        <div className="header">
          <h2>Editar Cita</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={handleCancel}
          />
        </div>
        <form className="formadcit" onSubmit={handleSubmit}>
          <div className="form-table">
            <div className="form-group">
              <label htmlFor="tratamiento">Tratamiento:</label>
              <select
                id="tratamiento"
                name="tratamiento"
                value={citaData.tratamiento}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar tratamiento</option>
                {tratamientos.map((trat) => (
                  <option key={trat.id} value={trat.id}>
                    {trat.tratamiento}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="medico">Médico:</label>
              <select
                id="medico"
                name="medico"
                value={citaData.medico}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar médico</option>
                {medicos.map((med) => (
                  <option key={med.id} value={med.id}>
                    {med.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="paciente">Paciente:</label>
              <select
                id="paciente"
                name="paciente"
                value={citaData.paciente}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar paciente</option>
                {pacientes.map((pac) => (
                  <option key={pac.id} value={pac.id}>
                    {pac.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fecha">Fecha:</label>
              <input
                type="text"
                id="fecha"
                name="fecha"
                value={citaData.fecha}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="hora">Hora:</label>
              <input
                type="text"
                id="hora"
                name="hora"
                value={citaData.hora}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="estado">Estado de la Cita:</label>
              <select
                id="estado"
                name="estado"
                value={citaData.estado}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pago">Pago:</label>
              <select
                id="pago"
                name="pago"
                value={citaData.pago}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar método de pago</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="costo">Costo:</label>
              <input
                type="number"
                id="costo"
                name="costo"
                value={citaData.costo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pagado">Pagado:</label>
              <select
                id="pagado"
                name="pagado"
                value={citaData.pagado}
                onChange={handleChange}
                required
              >
                <option value="No">No</option>
                <option value="Sí">Sí</option>
              </select>
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
      </div>
    </div>
  );
};

export default EditarCita;
