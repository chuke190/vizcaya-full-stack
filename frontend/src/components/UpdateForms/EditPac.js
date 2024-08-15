import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/AgregarPaciente.css';

const EditarPaciente = ({ pacientesData, setPacientesData }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [pacienteData, setPacienteData] = useState(null);

    useEffect(() => {
        console.log('ID from params:', id);
        console.log('Medicos list:', pacientesData);

        const paciente = pacientesData.find(paciente => paciente.id === parseInt(id));
        if (paciente) {
            setPacienteData(paciente);
        } else {
            navigate('/pacientes');
        }
        console.log(paciente);
    }, [id, pacientesData, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setPacienteData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pacienteData.tipoDocumento || !pacienteData.docIdentidad || !pacienteData.nombre || !pacienteData.email
            || !pacienteData.telefono || !pacienteData.encargado || !pacienteData.motivoConsulta || !pacienteData.diagnostico
            || !pacienteData.observaciones || !pacienteData.referidoPor) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const response = await fetch('http://localhost/vizcaya-full-stack/backend2/public/index.php?action=updatepaciente', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: pacienteData.id,
                tipoDocumento: pacienteData.tipoDocumento,
                docIdentidad: pacienteData.docIdentidad,
                nombre: pacienteData.nombre,
                email: pacienteData.email,
                telefono: pacienteData.telefono,
                bajoTratamientoMedico: pacienteData.bajoTratamientoMedico,
                propensoHemorragias: pacienteData.propensoHemorragias,
                hipertenso: pacienteData.hipertenso,
                embarazada: pacienteData.embarazada,
                diabetico: pacienteData.diabetico,
                motivoConsulta: pacienteData.motivoConsulta,
                diagnostico: pacienteData.diagnostico,
                observaciones: pacienteData.observaciones,
                referidoPor: pacienteData.referidoPor,
                encargado: pacienteData.encargado,
            })
        })

        const data = await response.json();


        if (data.message === 'exito') {
            const updatedPacientes = pacientesData.map(paciente => {
                if (paciente.id === pacienteData.id) {
                    return pacienteData;
                }
                return paciente;
            });
            setPacientesData(updatedPacientes);
            navigate('/pacientes');
        } else {
            alert('Hubo un error al editar el paciente.');
        }
    };

    const handleCancel = () => {
        navigate('/pacientes');
    };

    if (!pacienteData) {
        return null;
    }

    return (
        <div className="addpas-body">
            <div className="agregar-paciente-container">
                <div className="header">
                    <h2>Editar Paciente</h2>
                    <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => navigate('/pacientes')} />
                </div>
                <form onSubmit={handleSubmit} className="form-pas">
                    <div className="form-columns">
                        <div className="left-column">
                            <div className="form-group">
                                <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                                <input type="text" id="tipoDocumento" name="tipoDocumento" value={pacienteData.tipoDocumento} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="docIdentidad">No. Documento:</label>
                                <input type="number" id="docIdentidad" name="docIdentidad" value={pacienteData.docIdentidad} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombres:</label>
                                <input type="text" id="nombre" name="nombre" value={pacienteData.nombre} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={pacienteData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono:</label>
                                <input type="tel" id="telefono" name="telefono" value={pacienteData.telefono} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="encargado">Encargado:</label>
                                <input type="text" id="encargado" name="encargado" value={pacienteData.encargado} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="photo">Foto:</label>
                                <input type="file" id="photo" name="photo" onChange={handleChange} />
                                {pacienteData.photo && (
                                    <img
                                        src={typeof pacienteData.photo === 'string' ? pacienteData.photo : URL.createObjectURL(pacienteData.photo)}
                                        alt="Foto"
                                        className="user-photo"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="right-column-pas">
                            <h3>Historial Clínico</h3>
                            <div className="form-group checkbox-group">
                                <label htmlFor="bajoTratamientoMedico">Bajo Tratamiento Médico</label>
                                <input type="checkbox" id="bajoTratamientoMedico" name="bajoTratamientoMedico" checked={pacienteData.bajoTratamientoMedico} onChange={handleChange} />
                            </div>
                            <div className="form-group checkbox-group">
                                <label htmlFor="propensoHemorragias">Propenso a Hemorragias</label>
                                <input type="checkbox" id="propensoHemorragias" name="propensoHemorragias" checked={pacienteData.propensoHemorragias} onChange={handleChange} />
                            </div>
                            <div className="form-group checkbox-group">
                                <label htmlFor="hipertenso">Hipertenso</label>
                                <input type="checkbox" id="hipertenso" name="hipertenso" checked={pacienteData.hipertenso} onChange={handleChange} />
                            </div>
                            <div className="form-group checkbox-group">
                                <label htmlFor="embarazada">Embarazada</label>
                                <input type="checkbox" id="embarazada" name="embarazada" checked={pacienteData.embarazada} onChange={handleChange} />
                            </div>
                            <div className="form-group checkbox-group">
                                <label htmlFor="diabetico">Diabético</label>
                                <input type="checkbox" id="diabetico" name="diabetico" checked={pacienteData.diabetico} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="motivoConsulta">Motivo de Consulta:</label>
                                <textarea id="motivoConsulta" name="motivoConsulta" value={pacienteData.motivoConsulta} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="diagnostico">Diagnóstico:</label>
                                <textarea id="diagnostico" name="diagnostico" value={pacienteData.diagnostico} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="observaciones">Observaciones:</label>
                                <textarea id="observaciones" name="observaciones" value={pacienteData.observaciones} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="referidoPor">Referido por:</label>
                                <input type="text" id="referidoPor" name="referidoPor" value={pacienteData.referidoPor} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button className="btn-guardar-p" type="submit">Guardar</button>
                        <button className="btn-cancelar-p" type="button" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarPaciente;
