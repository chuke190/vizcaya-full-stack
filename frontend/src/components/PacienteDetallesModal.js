import React from 'react';

const PacienteDetallesModal = ({ paciente, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}>X</button>
                <h2>Detalles del Paciente</h2>
                <div className="modal-details">
                    <p><strong>Nombre:</strong> {paciente.nombre}</p>
                    <p><strong>Teléfono:</strong> {paciente.telefono}</p>
                    <p><strong>Email:</strong> {paciente.email}</p>
                    <p><strong>Encargado:</strong> {paciente.encargado}</p>
                    <p><strong>Motivo de Consulta:</strong> {paciente.motivoConsulta}</p>
                    <p><strong>Diagnóstico:</strong> {paciente.diagnostico}</p>
                    <p><strong>Observaciones:</strong> {paciente.observaciones}</p>
                    <p><strong>Referido Por:</strong> {paciente.referidoPor}</p>
                </div>
            </div>
        </div>
    );
};

export default PacienteDetallesModal;
