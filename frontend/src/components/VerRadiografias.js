import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/Radio-grafias.css';
import Nav from './Nav';

const VerRadiografias = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [radiografiaData, setRadiografiaData] = useState([]);

    useEffect(() => {
        // Cargar las radiografías del paciente seleccionado desde el backend
        fetch(`/api/radiografias/${patientId}`)
            .then(response => response.json())
            .then(data => setRadiografiaData(data))
            .catch(error => console.error('Error:', error));
    }, [patientId]);

    return (
        <div className="radiografias-body">
            <Nav />
            <div className="radiografias-container">
                <div className="header">
                    <button className="btn-back" onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <h2>Radiografías del Paciente</h2>
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

export default VerRadiografias;
