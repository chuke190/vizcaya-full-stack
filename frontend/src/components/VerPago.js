import React, { useState } from 'react';
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

    const pagoId = parseInt(id, 10);
    const pago = pagosData.find(p => p.id === pagoId);
    if (!pago) {
        return <div>Pago no encontrado</div>;
    }

    if (!Array.isArray(citasData)) {
        return <div>Error: citasData no es un array o no está definido.</div>;
    }

    const cita = citasData.find(c => c.id === pagoId);
    const medico = cita ? cita.medico : 'Desconocido';
    const estadoCita = cita ? cita.estado : 'Desconocido';
    const usuarioRecibio = usuariosData.find(u => u.id === pago.recibidoPor) || {};

    const handleCobrar = () => {
        if (pago.saldo <= 0 || estadoCita !== 'Pendiente') {
            alert('No se puede cobrar. El saldo es 0 o el estado de la cita no es pendiente.');
            return;
        }
        if (!Array.isArray(citasData)) {
            console.error('citasData no es un array o no está definido.');
            return;
        }

        const monto = parseFloat(montoACobrar);
        if (isNaN(monto) || monto <= 0 || monto > parseFloat(pago.saldo)) {
            alert('Monto ingresado no válido o excede el saldo pendiente.');
            return;
        }

        const updatedPagos = pagosData.map(p =>
            p.id === pagoId
                ? {
                    ...p,
                    saldo: (parseFloat((p.saldo).slice(1)) - monto).toFixed(2),
                    pagado: (parseFloat((p.pagado).slice(1)) + monto).toFixed(2),
                    recibidoPor: usuarioLogueado ? usuarioLogueado.id : p.recibidoPor,
                }
                : p
        );

        /* pagosData.map(p =>
            console.log(parseFloat((p.saldo).slice(1)))
        ); */

        setPagosData(updatedPagos);
        setMontoACobrar('');

        const pagoActualizado = updatedPagos.find(p => p.id === pagoId);
        if (pagoActualizado) {
            if (parseFloat(pagoActualizado.saldo) <= 0) {
                alert('El saldo ha sido completamente pagado.');
            } else {
                alert(`Pago de $${monto} realizado exitosamente.`);
            }
        } else {
            console.error('Pago actualizado no encontrado en updatedPagos');
        }

        setIngresosData(prevIngresos => {
            if (!Array.isArray(prevIngresos)) {
                console.error('prevIngresos no es un array');
                return [];
            }

            const existingIngreso = prevIngresos.find(i => i.pagoId === pagoId);
            if (existingIngreso) {
                console.log(prevIngresos)
                return prevIngresos.map(i =>
                    i.pagoId === pagoId
                        ? { ...i, monto: i.monto + monto }
                        : i
                );
            } else {
                console.log("pagoId", pagoId, "monto",monto)
                return [...prevIngresos, { pagoId, monto }];
            }
        });
    };

    const handleBack = () => {
        navigate('/pagos');
    };

    const handleVerIngresos = () => {
        const ingresos = {
            detalles: pagosData.map(pago => {
                const cita = citasData.find(c => c.id === pago.id) || {};
                return {
                    id: pago.id,
                    fecha: cita.fecha,
                    hora: cita.hora,
                    monto: parseFloat(pago.costo),
                    cobrado: parseFloat(pago.pagado),
                    usuarioRecibio: usuariosData.find(u => u.id === pago.recibidoPor) || {},
                    paciente: pago.paciente,
                    tratamiento: pago.tratamiento,
                    medico: cita.medico || 'Desconocido'
                };
            })
        };

        navigate('/admin/ingresos', { state: { ingresos, citasData } });
    };

    return (
        <div className="ver-pago-container">
            <Nav />
            <div className="pago-details">
                <div className="pago-details-left">
                    <p><strong>Paciente:</strong> {pago.paciente}</p>
                    <p><strong>Enfermedad:</strong> {pago.enfermedad}</p>
                    <p><strong>Tratamiento:</strong> {pago.tratamiento}</p>
                    <p><strong>Médico:</strong> {medico}</p>
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
                                <td>{usuarioRecibio.nombre ? `${usuarioRecibio.nombre} (${usuarioRecibio.rol})` : 'Desconocido'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No hay detalles de la cita.</p>
            )}

            {pago.saldo > 0 || estadoCita === 'Pendiente' ? (
                <div className="cobrar-section">
                    <input
                        type="number"
                        value={montoACobrar}
                        onChange={(e) => setMontoACobrar(e.target.value)}
                        placeholder="Monto a cobrar"
                    />
                    <button className="btn-cobrar" onClick={handleCobrar}>Cobrar</button>
                </div>
            ) : (
                <p>No hay saldo pendiente para cobrar o la cita no está pendiente.</p>
            )}
            <button className="btn-back" onClick={handleBack}>Regresar a Pagos</button>
        </div>
    );
};

export default VerPago;
