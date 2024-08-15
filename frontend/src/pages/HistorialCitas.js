import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/HistorialCitas.css';
import Nav from '../components/Nav';

const HistorialCitas = ({ citasData, setCitasData }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=getcitas');
                const data = await response.json();
                setCitasData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCitas();
    } , [setCitasData]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEditCita = (id) => {
        navigate(`/editar-cita/${id}`, { state: { citasData } });
    };

    const handleDeleteCita = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
            setCitasData(citasData.filter(cita => cita.id !== id));
        }
    };

    const handleVerPago = (cita) => {
        navigate(`/ver-pago/${cita.id}`, { state: { citaSeleccionada: cita } });
    };

    return (
        <div className="historial-citas-body">
            <Nav />
            <div className="historial-citas-header">
                <div className="search-bar-h">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>
            </div>
            <div className="historial-citas-container">
                <table className="historial-citas-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tratamiento</th>
                            <th>Médico</th>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Estado</th>
                            <th>Costo</th>
                            <th>Pagado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citasData
                            .map(cita => (
                                <tr key={cita.id}>
                                    <td>{cita.id}</td>
                                    <td>{cita.tratamiento_nombre}</td>
                                    <td>{cita.medico_nombre}</td>
                                    <td>{cita.paciente_nombre}</td>
                                    <td>{cita.fecha}</td>
                                    <td>{cita.hora}</td>
                                    <td>{cita.estado}</td>
                                    <td>{cita.costo}</td>
                                    <td>{cita.pagado}</td>
                                    <td>
                                        <button className="btn-edit-h" onClick={() => handleEditCita(cita.id)}>Editar</button>
                                        <button className="btn-ver-pago-h" onClick={() => handleVerPago(cita)}>Ver Pago</button>
                                        <button className="btn-delete-h" onClick={() => handleDeleteCita(cita.id)}>Eliminar</button>

                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistorialCitas;
