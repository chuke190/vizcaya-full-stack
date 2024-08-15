import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUpload, faDownload, faSave, faEye } from '@fortawesome/free-solid-svg-icons';
import '../styles/Radio-grafias.css';
import Nav from '../components/Nav';

const Radiografias = () => {
    const navigate = useNavigate();
    const [selectedPatient, setSelectedPatient] = useState('');
    const [radiografiaData, setRadiografiaData] = useState([]);
    const [patients, setPatients] = useState([]);
    const [pacientesData, setPacientesData] = useState([]);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=getpacientes');
                const data = await response.json();
                setPacientesData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchPacientes();
    }, []);

    const handlePatientChange = (e) => {
        setSelectedPatient(e.target.value);
        // Cargar las radiografías del paciente seleccionado desde el backend
        fetch(`/api/radiografias/${e.target.value}`)
            .then(response => response.json())
            .then(data => setRadiografiaData(data))
            .catch(error => console.error('Error:', error));
    };

    const handleImport = (e) => {
        const files = e.target.files;
        const newFiles = [];
        for (let file of files) {
            const reader = new FileReader();
            reader.onload = (event) => {
                newFiles.push({
                    name: file.name,
                    data: event.target.result
                });
                // Una vez que todas las imágenes han sido procesadas, actualizamos el estado
                if (newFiles.length === files.length) {
                    setRadiografiaData(prevData => [...prevData, ...newFiles]);
                }
            };
            reader.readAsDataURL(file);  // readAsDataURL para manejar imágenes
        }
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(radiografiaData);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `${selectedPatient}_radiografias.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleSave = () => {
        if (selectedPatient && radiografiaData) {
            
        }
    };

    const handleView = () => {
        if (radiografiaData.length > 0) {
            const newWindow = window.open('', '_blank');
            newWindow.document.write('<html><head><title>Radiografías</title></head><body>');
            radiografiaData.forEach(file => {
                if (file.data.startsWith('data:image')) {
                    newWindow.document.write(`<img src="${file.data}" alt="${file.name}" style="max-width: 100%; height: auto; margin-bottom: 10px;">`);
                } else {
                    newWindow.document.write(`<pre>${JSON.stringify(file, null, 2)}</pre>`);
                }
            });
            newWindow.document.write('</body></html>');
            newWindow.document.close();
        } else {
            alert('No hay radiografías para mostrar.');
        }
    };

    return (
        <div className="radiografias-body">
            <Nav />
            <div className="radiografias-container">
                <div className="header">
                    <button className="btn-backk" onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <h2>Radiografías Pacientes</h2>
                </div>
                <div className="form-group">
                    <label htmlFor="patient">Seleccionar Paciente:</label>
                    <select id="patient" name="patient" value={selectedPatient} onChange={handlePatientChange} required>
                        <option value="">Seleccionar paciente</option>
                        {pacientesData.map(patient => (
                            <option key={patient.id} value={patient.id}>{patient.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="button-group">
                    <label className="btn-import-r" htmlFor="file-upload">
                        <FontAwesomeIcon icon={faUpload} /> Importar
                    </label>
                    <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleImport} multiple accept="image/*,application/json" />
                    <button className="btn-export-r" onClick={handleExport}>
                        <FontAwesomeIcon icon={faDownload} /> Exportar
                    </button>
                    <button className="btn-view-r" onClick={handleView}>
                        <FontAwesomeIcon icon={faEye} /> Ver
                    </button>
                    <button className="btn-save-r" onClick={handleSave}>
                        <FontAwesomeIcon icon={faSave} /> Guardar
                    </button>
                </div>
                <div className="radiografias-display">
                    {radiografiaData.length > 0 ? (
                        radiografiaData.map((file, index) => (
                            <div key={index} className="radiografia-item">
                                {file.data.startsWith('data:image') ? (
                                    <img src={file.data} alt={file.name} />
                                ) : (
                                    <pre>{JSON.stringify(file, null, 2)}</pre>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No hay datos de radiografías para mostrar.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Radiografias;
