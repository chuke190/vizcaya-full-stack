import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import '../styles/ReportesPaciente.css';

const ReportePacientes = () => {
    // Ejemplo de datos de pacientes
    const [pacientesData, setPacientesData] = useState([
    ]);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await fetch('http://localhost/vizcaya-full-stack/backend2/public/index.php?action=getpacientes');
                const data = await response.json();
                setPacientesData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchPacientes();
    }, [setPacientesData]);

    // Obtener la fecha actual
    const fechaActual = new Date().toLocaleDateString();
    const horaActual = new Date().toLocaleTimeString();

    return (
        <div className="reporte-pacientes-body">
            <Nav />
            <div className="pacientes-view">
            <h2 className="reporte-pacientes-titulo">Reporte de Pacientes</h2>
            <p className="reporte-fecha">{fechaActual} {horaActual}</p>
            <div className="reporte-pacientes-container">
                <table className="reporte-pacientes-table">
                    <thead>
                        <tr>
                            <th>Doc. Identidad</th>
                            <th>Nombre</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientesData.length ? (
                            pacientesData.map(paciente => (
                                <tr key={paciente.id}>
                                    <td>{paciente.docIdentidad}</td>
                                    <td>{paciente.nombre}</td>
                                    <td>{paciente.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No hay datos de pacientes disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default ReportePacientes;
