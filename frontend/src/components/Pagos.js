import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Pagos.css';
import Nav from './Nav';

const Pagos = ({ pagosData, citasData, usuariosData, setPagosData, usuarioLogueado }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredPagos, setFilteredPagos] = useState([]);

    useEffect(() => {
        // Simula una carga de datos inicial
        setTimeout(() => {
            setIsLoading(false);
            setFilteredPagos(pagosData);
        }, );
    }, [pagosData]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setFilteredPagos(
            pagosData.filter(pago =>
                pago.paciente.toLowerCase().includes(e.target.value.toLowerCase()) ||
                pago.tratamiento.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    const handleVerPago = (id) => {
        if (!citasData) {
            alert("Los datos de las citas no están disponibles. Intente nuevamente más tarde.");
            return;
        }
        const citaSeleccionada = citasData.find(cita => cita.id === id);
        if (!citaSeleccionada) {
            alert(`No se encontró una cita con el id: ${id}`);
            return;
        }
        navigate(`/ver-pago/${id}`, { state: { citaSeleccionada, usuarioLogueado, usuariosData } });
    };

    const handleDeletePago = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este pago? Esta acción no se puede deshacer.')) {
            setPagosData(prevState => prevState.filter(pago => pago.id !== id));
            alert("Pago eliminado exitosamente.");
        }
    };

    const handleCobrarPago = (id) => {
        const pago = pagosData.find(pago => pago.id === id);
        if (pago && pago.saldo > 0) {
            const amountToPay = prompt(`El saldo restante es $${pago.saldo}. Ingrese el monto a pagar:`);
            const amountPaid = parseFloat(amountToPay);
    
            if (!isNaN(amountPaid) && amountPaid > 0 && amountPaid <= pago.saldo) {
                const updatedPagos = pagosData.map(p =>
                    p.id === id ? { 
                        ...p, 
                        saldo: (parseFloat(p.saldo) - amountPaid).toFixed(2), 
                        pagado: (parseFloat(p.pagado) + amountPaid).toFixed(2), 
                        recibidoPor: usuarioLogueado.nombre 
                    } : p
                );
                setPagosData(updatedPagos);
                alert(`Pago de $${amountPaid} realizado exitosamente.`);
                navigate(`/cobrar-pago/${id}`);
            } else {
                alert('Monto ingresado no válido o excede el saldo pendiente.');
            }
        } else {
            alert('El pago ya está completamente realizado.');
        }
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
        <div className="pagos-body">
            <Nav />
            <div className="pagos-header">
                <div className="search-bar-p">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>
            </div>
            {isLoading ? (
                <div className="loading-container">
                    <p>Cargando...</p>
                </div>
            ) : (
                <div className="pagos-container">
                    <table className="pagos-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Paciente</th>
                                <th>Tratamiento</th>
                                <th>Enfermedad</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Costo</th>
                                <th>Saldo</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPagos.map(pago => (
                                <tr key={pago.id}>
                                    <td>{pago.id}</td>
                                    <td>{pago.paciente}</td>
                                    <td>{pago.tratamiento}</td>
                                    <td>{pago.enfermedad}</td>
                                    <td>{pago.fecha}</td>
                                    <td>{pago.hora}</td>
                                    <td>{pago.costo}</td>
                                    <td>{pago.saldo}</td>
                                    <td>
                                        <button className="btn-ver-p" onClick={() => handleVerPago(pago.id)}>Ver</button>
                                        <button className="btn-delete-p" onClick={() => handleDeletePago(pago.id)}>Eliminar</button>
                                        {pago.saldo > 0 && <button className="btn-cobrar-p" onClick={() => handleCobrarPago(pago.id)}>Cobrar</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredPagos.length === 0 && <p>No se encontraron pagos que coincidan con la búsqueda.</p>}
                </div>
            )}
        </div>
    );
};

export default Pagos;
