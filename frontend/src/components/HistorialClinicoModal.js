import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/HistorialClinicoModal.css';

const HistorialClinicoModal = ({ paciente, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Historial Clínico de {paciente.nombre}</h2>
                    <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={onClose} />
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Tipo de Documento:</label>
                        <p>{paciente.tipoDocumento || 'No disponible'}</p>
                    </div>
                    <div className="form-group">
                        <label>No. Documento:</label>
                        <p>{paciente.docIdentidad || 'No disponible'}</p>
                    </div>
                    <div className="form-group">
                        <label>Nombres:</label>
                        <p>{paciente.nombre}</p>
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <p>{paciente.email}</p>
                    </div>
                    <div className="form-group">
                        <label>Teléfono:</label>
                        <p>{paciente.telefono}</p>
                    </div>
                    <h3>Historial Clínico</h3>
                    <div className="form-group checkbox-group">
                        <label>Bajo Tratamiento Médico:</label>
                        <p>{paciente.bajoTratamientoMedico ? 'Sí' : 'No'}</p>
                    </div>
                    <div className="form-group checkbox-group">
                        <label>Propenso a Hemorragias:</label>
                        <p>{paciente.propensoHemorragias ? 'Sí' : 'No'}</p>
                    </div>
                    <div className="form-group checkbox-group">
                        <label>Hipertenso:</label>
                        <p>{paciente.hipertenso ? 'Sí' : 'No'}</p>
                    </div>
                    <div className="form-group checkbox-group">
                        <label>Embarazada:</label>
                        <p>{paciente.embarazada ? 'Sí' : 'No'}</p>
                    </div>
                    <div className="form-group checkbox-group">
                        <label>Diabético:</label>
                        <p>{paciente.diabetico ? 'Sí' : 'No'}</p>
                    </div>
                    <div className="form-group">
                        <label>Motivo de Consulta:</label>
                        <p>{paciente.motivoConsulta || 'No disponible'}</p>
                    </div>
                    <div className="form-group">
                        <label>Diagnóstico:</label>
                        <p>{paciente.diagnostico || 'No disponible'}</p>
                    </div>
                    <div className="form-group">
                        <label>Observaciones:</label>
                        <p>{paciente.observaciones || 'No disponible'}</p>
                    </div>
                    <div className="form-group">
                        <label>Referido por:</label>
                        <p>{paciente.referidoPor || 'No disponible'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistorialClinicoModal;
