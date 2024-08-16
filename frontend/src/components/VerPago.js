import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Nav from './Nav';
import '../styles/VerPago.css';

const VerPago = ({ pagosData, citasData, usuariosData, setPagosData, setIngresosData }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { usuarioLogueado } = location.state || {};
    const [montoACobrar, setMontoACobrar] = useState('');
    const { citaSeleccionada } = location.state || {};
    const [ historialPagos, setHistorialPagos ] = useState([]);
    const pagoId = parseInt(id, 10);
    
    useEffect(() => {
        const fetchHistorialPagos = async () => {
            const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=gethistorialpagos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    pago_id: pagoId,
                 }),
            });
            const data = await response.json();
            setHistorialPagos(data);
            console.log(data);
        };

        fetchHistorialPagos();
    }, [pagoId]);
    
    const pago = pagosData.find(p => p.id === pagoId);
    if (!pago) {
        console.log(pago)
        return <div>Pago no encontrado</div>;
    }
    
    

    if (!Array.isArray(citasData)) {
        return <div>Error: citasData no es un array o no está definido.</div>;
    }

    const cita = citasData.find(c => c.id === pagoId);
    const medico = cita ? cita.medico : 'Desconocido';
    const estadoCita = cita ? cita.estado : 'Desconocido';
    const usuarioRecibio = usuariosData.find(u => u.id === pago.recibidoPor) || {};

    const handleBack = () => {
        navigate('/pagos');
    };

    return (
        <div className="ver-pago-container">
            <Nav />
            <div className="pago-details">
                <div className="pago-details-left">
                    <p><strong>Paciente:</strong> {pago.paciente_nombre}</p>
                    <p><strong>Tratamiento:</strong> {pago.tratamiento_nombre}</p>
                    <p><strong>Médico:</strong> {cita.medico_nombre}</p>
                </div>
                <div className="pago-details-right">
                    <p><strong>Estado:</strong> {estadoCita}</p>
                    <p><strong>Costo:</strong> {pago.costo}</p>
                    <p><strong>Pagado:</strong>{pago.pagado}</p>
                    <p><strong>Saldo:</strong> {pago.saldo}</p>
                </div>
            </div>
            <h3>Detalles de la Cita</h3>
            {cita ? (
                <div className="usuarios-container">
                    <table className="cita-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Monto</th>
                                <th>Cobrado</th>
                                <th>Recibió</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{cita.id}</td>
                                <td>{cita.fecha}</td>
                                <td>{cita.hora}</td>
                                <td>{pago.costo}</td>
                                <td>{pago.pagado}</td>
                                <td>{pago.recibidoPor}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            ) : (
                <p>No hay detalles de la cita.</p>
            )}
            <h3>Detalles del Pago</h3>
            {historialPagos ? (
                <div className="usuarios-container">
                    <table className="cita-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha/Hora</th>
                                <th>Monto</th>
                                <th>Recibe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historialPagos.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.fecha}</td>
                                    <td>{p.cantidad}</td>
                                    <td>{p.recibio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ) : (
                    <p>No hay detalles del pago.</p>
                )}



            <button className="btn-back" onClick={handleBack}>Regresar a Pagos</button>
        </div>
    );
};

export default VerPago;
