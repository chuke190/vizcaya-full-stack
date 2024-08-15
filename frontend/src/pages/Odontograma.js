import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faDownload,
  faSave,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import mammoth from "mammoth";
import { saveAs } from "file-saver";
import "../styles/Odontograma.css";
import Nav from "../components/Nav";
import axios from "axios";

const Odontograma = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [odontogramaData, setOdontogramaData] = useState(null);
  const [pacientesData, setPacientesData] = useState([]);
  const [file, setFile] = useState(null);

  const upload_endpoint = "http://localhost/sisDenatal/backend2/controller/uploadDoc.php";

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch(
          "http://localhost/sisDenatal/backend2//public/index.php?action=getpacientes"
        );
        const data = await response.json();
        setPacientesData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPacientes();
  }, []);

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
    // Cargar las radiografías del paciente seleccionado desde el backend


    // Clear odontogramaData when patient is changed
    setOdontogramaData(null);
  };

  /*  const handleInput = (e) => {
     console.log(e.target.files[0]);
     setFile(e.target.files[0]);
   }; */

  const handleImport = async (e) => {
    const file = e.target.files[0];
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setOdontogramaData(result.value);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    if (odontogramaData) {
      const blob = new Blob([odontogramaData], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      saveAs(blob, `${selectedPatient}_odontograma.docx`);
    }
  };

  const handleView = () => {
    if (odontogramaData) {
      const newWindow = window.open();
      newWindow.document.write(odontogramaData);
      newWindow.document.close();
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(upload_endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleSave = async () => {
    if (odontogramaData && selectedPatient) {
      let res = await uploadFile(file);
      console.log(res);
    };
  };

  return (
    <div className="odontograma-body">
      <Nav />
      <div className="odontograma-container">
        <div className="header">
          <button className="btn-back-od" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h2>Odontograma Pacientes</h2>
        </div>
        <div className="form-group">
          <label htmlFor="patient">Seleccionar Paciente:</label>
          <select
            id="patient"
            name="patient"
            value={selectedPatient}
            onChange={handlePatientChange}
            required
          >
            <option value="">Seleccionar paciente</option>
            {pacientesData.map((paciente) => (
              <option key={paciente.id} value={paciente.nombre}>
                {paciente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="button-group">
          <label className="btn-importt" htmlFor="file-upload">
            <FontAwesomeIcon icon={faUpload} /> Importar
          </label>
          <input
            type="file"
            id="file-upload"
            name="file-upload"
            style={{ display: "none" }}
            onChange={handleImport}
          />
          <button className="btn-exportt" onClick={handleExport}>
            <FontAwesomeIcon icon={faDownload} /> Exportar
          </button>
          <button className="btn-view" onClick={handleView}>
            <FontAwesomeIcon icon={faEye} /> Ver
          </button>
          <button className="btn-save" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} /> Guardar
          </button>
        </div>
        <div className="odontograma-display">
          {odontogramaData ? (
            <div dangerouslySetInnerHTML={{ __html: odontogramaData }} />
          ) : (
            <p>No hay datos de odontograma para mostrar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Odontograma;
