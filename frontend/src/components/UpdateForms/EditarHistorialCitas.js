// EditarHistorialCitas.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/AgregarCitas.css';

const EditarHistorialCitas = ({ tratamientos = [], setCitasData }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { citasData } = location.state || {}; // Obtener citasData del estado, o un valor por defecto

    const citaId = parseInt(id, 10);
    const citaToEdit = citasData ? citasData.find(cita => cita.id === citaId) : null;

    const [citaData, setCitaData] = useState({
        tratamiento: '',
        medico: '',
        paciente: '',
        fecha: '',
        hora: '',
        estado: '',
        pago: '',
        costo: '',
        pagado: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (citaToEdit) {
            setCitaData(citaToEdit);
        } else {
            setError('Cita no encontrada');
        }
    }, [citaToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCitaData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!citaData.tratamiento || !citaData.medico || !citaData.paciente || !citaData.fecha || !citaData.hora || !citaData.estado || !citaData.pago || !citaData.costo || !citaData.pagado) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        setError('');
        const updatedCitas = citasData.map(c => c.id === citaId ? { ...citaData, id: citaId } : c);
        setCitasData(updatedCitas);
        navigate('/historial-citas');
    };

    const handleCancel = () => {
        navigate('/historial-citas');
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="addcita-body">
            <div className="edcita-container">
                <div className="header">
                    <h2>Editar Historial de Cita</h2>
                    <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleCancel} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-table">
                        <div className="form-group">
                            <label id="tratamiento" htmlFor="tratamiento">Tratamiento:</label>
                            <select id="tratamiento" name="tratamiento" value={citaData.tratamiento} onChange={handleChange} required>
                                <option id="tratamiento" value="">Seleccionar tratamiento</option>
                                {tratamientos.map(trat => (
                                    <option key={trat.id} value={trat.tratamiento}>{trat.tratamiento}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="medico">Médico:</label>
                            <input type="text" name="medico" value={citaData.medico} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paciente">Paciente:</label>
                            <input type="text" name="paciente" value={citaData.paciente} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha:</label>
                            <input type="date" name="fecha" value={citaData.fecha} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hora">Hora:</label>
                            <input type="time" name="hora" value={citaData.hora} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label id="estado" htmlFor="estado">Estado:</label>
                            <select id="estado" name="estado" value={citaData.estado} onChange={handleChange} required>
                                <option id="estado" value="">Seleccionar estado</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="cancelada">Cancelada</option>
                                <option value="confirmada">Confirmada</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label id="pago" htmlFor="pago">Pago:</label>
                            <select id="pago" name="pago" value={citaData.pago} onChange={handleChange} required>
                                <option id="pago" value="">Seleccionar método de pago</option>
                                <option value="tarjeta">Tarjeta</option>
                                <option value="efectivo">Efectivo</option>
                                <option value="transferencia">Transferencia</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="costo">Costo:</label>
                            <input type="number" name="costo" value={citaData.costo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label id="pagado" htmlFor="pagado">Pagado:</label>
                            <select id="pagado" name="pagado" value={citaData.pagado} onChange={handleChange} required>
                                <option id="pagado" value="">Seleccionar estado del pago</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="en proceso">En proceso</option>
                                <option value="pagado">Pagado</option>
                            </select>
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn-guardar">Guardar</button>
                        <button type="button" className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarHistorialCitas;
