import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Pagos.css';
import Nav from '../components/Nav';

const Pagos = ({ pagosData, citasData, setCitasData, usuariosData, setPagosData, loggedInUser }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredPagos, setFilteredPagos] = useState([]);


    useEffect(() => {
        const fetchPagos = async () => {
            try {
                const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=getpagos');
                const data = await response.json();
                setPagosData(data);
                console.log(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchPagos();

        const fetchCitas = async () => {
            try {
                const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=getcitas');
                const data = await response.json();
                setCitasData(data);
                console.log(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchCitas();
    }, [setPagosData, setCitasData]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setFilteredPagos(
            pagosData.filter(pago =>
                pago.paciente_nombre.toLowerCase().includes(e.target.value.toLowerCase()) ||
                pago.tratamiento_nombre.toLowerCase().includes(e.target.value.toLowerCase())
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
        navigate(`/ver-pago/${id}`, { state: { citaSeleccionada, loggedInUser, usuariosData } });
    };

    const handleDeletePago = (id) => {
        const pago = pagosData.find(pago => pago.id === id);
        if (pago.saldo > 0) {
            alert('No se puede eliminar un pago que aún tiene saldo pendiente.');
            return;
        } else {
            if (window.confirm('¿Está seguro que desea eliminar este pago?')) {
                fetch('http://localhost/sisDenatal/backend2/public/index.php?action=deletepago', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === 'exito') {
                            alert('Pago eliminado exitosamente.');
                            setPagosData(prevState => prevState.filter(pago => pago.id !== id));
                        } else {
                            alert('Ocurrió un error al eliminar el pago. Intente nuevamente.');
                        }
                    });
            }
        }
    };

    const handleCobrarPago = async (id) => {
        const pago = pagosData.find(pago => pago.id === id);
        if (pago && pago.saldo > 0) {
            const amountToPay = prompt(`El saldo restante es $${pago.saldo}. Ingrese el monto a pagar:`);
            const amountPaid = parseFloat(amountToPay);
    
            if (!isNaN(amountPaid) && amountPaid > 0 && amountPaid <= pago.saldo) {
                const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=cobrarpago', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: id,
                        pagado: amountPaid,
                        saldo: pago.saldo
                    }),
                });
                const data = await response.json();
                console.log(data.message);
                if (data.message === 'exito') {
                    alert('Pago realizado exitosamente.');
                    setPagosData(prevState => prevState.map(pago => {
                        if (pago.id === id) {
                            return { ...pago, pagado: parseFloat(pago.pagado) + amountPaid, saldo: parseFloat(pago.saldo) - amountPaid };
                        }
                        return pago;
                    }));
                } else {
                    alert('Ocurrió un error al realizar el pago. Intente nuevamente.');
                }

                const response2 = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=addhistorialpago', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pago_id: id,
                        cantidad: amountPaid,
                        recibio: loggedInUser.nombre,
                        fecha: new Date().toISOString().slice(0, 19),
                    }),
                }
                );
                const data2 = await response2.json();
                console.log(data2.message);
                if (data2.message === 'exito') {
                    console.log('Historial de pagos actualizado exitosamente.');
                } else {
                    console.log('Ocurrió un error al actualizar el historial de pagos.');
                }
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
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Costo</th>
                                <th>Saldo</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagosData.map(pago => (
                                <tr key={pago.id}>
                                    <td>{pago.id}</td>
                                    <td>{pago.paciente_nombre}</td>
                                    <td>{pago.tratamiento_nombre}</td>
                                    <td>{pago.fecha}</td>
                                    <td>{pago.hora}</td>
                                    <td>{pago.costo}</td>
                                    <td>{pago.saldo}</td>
                                    <td>
                                        <button className="btn-ver-p" onClick={() => handleVerPago(pago.id)}>Ver</button>
                                        <button className="btn-delete-p" onClick={() => handleDeletePago(pago.id)}>Eliminar</button>
                                        {pago.saldo > 0 && <button className="btn-cobrar" onClick={() => handleCobrarPago(pago.id)}>Cobrar</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pagosData.length === 0 && <p>No se encontraron pagos que coincidan con la búsqueda.</p>}
                </div>
            )}
        </div>
    );
};

export default Pagos;
