import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/AgregarCitas.css';

const EditAppointment = ({ citasData, setCitasData, tratamientos, pacientesData, medicosData }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const citaToEdit = citasData.find(cita => cita.id === parseInt(id));

    const [citaData, setCitaData] = useState(citaToEdit || {
        tratamiento: '',
        medico: '',
        paciente: '',
        fecha: '',
        hora: '',
        estado: 'Pendiente',
        pago: '',
        costo: '',
        pagado: 'No'
    });

    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState(null);

    useEffect(() => {
        if (citaToEdit) {
            setCitaData(citaToEdit);
            const paciente = pacientesData.find(paciente => paciente.nombre === citaToEdit.paciente);
            setPacienteSeleccionado(paciente);
            const tratamiento = tratamientos.find(trat => trat.tratamiento === citaToEdit.tratamiento);
            setTratamientoSeleccionado(tratamiento);
            if (tratamiento) {
                setCitaData(prevState => ({
                    ...prevState,
                    costo: citaToEdit.costo || tratamiento.precio
                }));
            }
        }
    }, [citaToEdit, pacientesData, tratamientos]);

    useEffect(() => {
        if (citaData.paciente) {
            const paciente = pacientesData.find(paciente => paciente.nombre === citaData.paciente);
            setPacienteSeleccionado(paciente);

            if (paciente) {
                // Buscar la cita relacionada con el paciente seleccionado
                const citaRelacionada = citasData.find(cita => cita.paciente === paciente.nombre && cita.id !== parseInt(id));
                if (citaRelacionada) {
                    const tratamiento = tratamientos.find(trat => trat.tratamiento === citaRelacionada.tratamiento);
                    setTratamientoSeleccionado(tratamiento);
                    if (tratamiento) {
                        console.log(tratamiento)
                        setCitaData(prevState => ({
                            ...prevState,
                            tratamiento: tratamiento.tratamiento,
                            costo: prevState.costo || tratamiento.precio
                        }));
                    }
                } else {
                    // Resetear tratamiento y costo si no hay citas relacionadas
                    setTratamientoSeleccionado(null);
                    setCitaData(prevState => ({
                        ...prevState,
                        tratamiento: '',
                        costo: ''
                    }));
                }
            } else {
                // Resetear todos los campos si no hay paciente seleccionado
                setCitaData(prevState => ({
                    ...prevState,
                    tratamiento: '',
                    medico: '',
                    fecha: '',
                    hora: '',
                    estado: 'Pendiente',
                    pago: '',
                    costo: '',
                    pagado: 'No'
                }));
                setTratamientoSeleccionado(null);
            }
        }
    }, [citaData.paciente, citasData, pacientesData, tratamientos, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCitaData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTratamientoChange = (e) => {
        const tratamientoId = e.target.value;
        const tratamiento = tratamientos.find(trat => trat.id === parseInt(tratamientoId));
        if (tratamiento) {
            setTratamientoSeleccionado(tratamiento);
            setCitaData(prevState => ({
                ...prevState,
                tratamiento: tratamiento.tratamiento,
                costo: prevState.costo || tratamiento.precio
            }));
        } else {
            // Resetear costo si no hay tratamiento seleccionado
            setCitaData(prevState => ({
                ...prevState,
                tratamiento: '',
                costo: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCitasData(prevState => prevState.map(cita => cita.id === parseInt(id) ? citaData : cita));
        navigate('/citas');
    };

    const handleCancel = () => {
        navigate('/citas');
    };

    return (
        <div className="addcita-body">
            <div className="agregar-cita-container">
                <div className="header">
                    <h2>Editar Cita</h2>
                    <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleCancel} />
                </div>
                <form className="formadcit" onSubmit={handleSubmit}>
                    <div className="form-table">
                        <div className="form-group">
                            <label htmlFor="paciente">Paciente:</label>
                            <select id="paciente" name="paciente" value={citaData.paciente} onChange={handleChange} required>
                                <option value="">Seleccionar paciente</option>
                                {pacientesData.map(paciente => (
                                    <option key={paciente.id} value={paciente.nombre}>{paciente.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="infocit">
                        {pacienteSeleccionado && (
                            <div className="form-group paciente-info">
                                <p><strong>Nombre:</strong> {pacienteSeleccionado.nombre}</p>
                                <p><strong>Email:</strong> {pacienteSeleccionado.email}</p>
                                <p><strong>Teléfono:</strong> {pacienteSeleccionado.telefono}</p>
                                <p><strong>Estado:</strong> {citaData.estado}</p>
                                {tratamientoSeleccionado && (
                                    <>
                                        <p><strong>Tratamiento:</strong> {tratamientoSeleccionado.tratamiento}</p>
                                        <p><strong>Costo:</strong> {citaData.costo}</p>
                                    </>
                                )}
                            </div>
                        )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="tratamiento">Tratamiento:</label>
                            <select id="tratamiento" name="tratamiento" value={tratamientoSeleccionado ? tratamientoSeleccionado.id : ''} onChange={handleTratamientoChange} required>
                                <option value="">Seleccionar tratamiento</option>
                                {tratamientos.map(trat => (
                                    <option key={trat.id} value={trat.id}>{trat.tratamiento}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="medico">Médico:</label>
                            <select id="medico" name="medico" value={citaData.medico} onChange={handleChange} required>
                                <option value="">Seleccionar médico</option>
                                {medicosData.map(medico => (
                                    <option key={medico.id} value={medico.nombre}>{medico.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha:</label>
                            <input type="date" id="fecha" name="fecha" value={citaData.fecha} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hora">Hora:</label>
                            <input type="time" id="hora" name="hora" value={citaData.hora} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="estado">Estado de la Cita:</label>
                            <select id="estado" name="estado" value={citaData.estado} onChange={handleChange} required>
                                <option value="">Seleccionar estado</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Completada">Completada</option>
                                <option value="Confirmada">Confirmada</option>
                                <option value="Cancelada">Cancelada</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pago">Pago:</label>
                            <select id="pago" name="pago" value={citaData.pago} onChange={handleChange} required>
                                <option value="">Seleccionar método de pago</option>
                                <option value="Tarjeta">Tarjeta</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="costo">Costo:</label>
                            <input type="number" id="costo" name="costo" value={citaData.costo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pagado">Pagado:</label>
                            <select id="pagado" name="pagado" value={citaData.pagado} onChange={handleChange} required>
                                <option value="No">No</option>
                                <option value="Sí">Sí</option>
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

export default EditAppointment;
