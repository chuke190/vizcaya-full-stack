import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/Citas.css';
import Nav from './Nav';

const Citas = ({ citasData, setCitasData }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [citaData, setCitaData] = useState([]);

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=getcitas');
                const data = await response.json();
                setCitasData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchCitas();
    }, [setCitasData]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddCita = () => {
        navigate('/agregar-citas');
    };

    const handleEditCita = (id) => {
        navigate(`/editar-cita/${id}`);
    };

    const handleDeleteCita = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
            const deleteCita = async () => {
                try {
                    const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=deletecita', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id })
                    });
                    const data = await response.json();
                    if (data) {
                        setCitasData(citasData.filter(cita => cita.id !== id));
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            deleteCita();
        }
    };

    const handleViewCitas = () => {
        navigate('/citas-view', { state: { citas: citasData } });
    };

    return (
        <div className="citas-body">
            <Nav />
            <div className="citas-header">
                <button className="btn-back-cit" onClick={() => navigate('/dashboard')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button className="btn-add-cit" onClick={handleAddCita}>
                    <FontAwesomeIcon icon={faPlus} /> Agregar Cita
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
            <div className="citas-container">
                
                <table className="citas-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tratamiento</th>
                            <th>Médico</th>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Costo</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citasData.map((cita, index) => (
                            <tr key={cita.id}>
                                <td>{index + 1}</td>
                                <td>{cita.tratamiento_nombre}</td>
                                <td>{cita.medico_nombre}</td>
                                <td>{cita.paciente_nombre}</td>
                                <td>{cita.fecha}</td>
                                <td>{cita.hora}</td>
                                <td>{cita.costo}</td>
                                <td>
                                    <button className="btn-editte" onClick={() => handleEditCita(cita.id)}>Editar</button>
                                    <button className="btn-delette" onClick={() => handleDeleteCita(cita.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Citas;
