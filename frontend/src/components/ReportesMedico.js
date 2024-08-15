// src/components/ReporteDoctores.js
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import '../styles/ReportesMedico.css';

const ReporteDoctores = () => {
    // Ejemplo de datos de doctores
    const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        const FetchMedicos = async () => {
            try {
                const response = await fetch('http://localhost/vizcaya-full-stack/backend2/public/index.php?action=getmedicos');
                const data = await response.json();
                setMedicos(data);
            } catch (error) {
                console.error('Error:', error);
            }
            console.log(medicos);
        }
        FetchMedicos();

    }, [setMedicos]);

    // Obtener la fecha y la hora actual
    const fechaActual = new Date().toLocaleDateString();
    const horaActual = new Date().toLocaleTimeString();

    return (
        <div className="reporte-doctores-body">
            <Nav />
            <div className="pacientes-view">
                <h2 className="reporte-doctores-titulo">Reporte de Doctores</h2>
                <p className="reporte-fecha">{fechaActual} {horaActual}</p>
                <div className="reporte-doctores-container">
                    <table className="reporte-doctores-table">
                        <thead>
                            <tr>
                                <th>Doc. Identidad</th>
                                <th>Nombres</th>
                                <th>Especialidad</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicos.map(doctor => (
                                <tr key={doctor.id}>
                                    <td>{doctor.dni}</td>
                                    <td>{doctor.nombre}</td>
                                    <td>{doctor.especialidad_nombre}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.telefono}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReporteDoctores;
