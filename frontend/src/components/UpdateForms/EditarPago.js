import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarPago = ({ pagosData, setPagosData }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pago, setPago] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        cantidad: '',
        fecha: '',
    });

    useEffect(() => {
        const pagoToEdit = pagosData.find(pago => pago.id === id);
        if (pagoToEdit) {
            setPago(pagoToEdit);
            setFormData({
                nombre: pagoToEdit.nombre,
                cantidad: pagoToEdit.cantidad,
                fecha: pagoToEdit.fecha,
            });
        }
    }, [id, pagosData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPago = { ...pago, ...formData };
        const updatedPagosData = pagosData.map(p => p.id === id ? updatedPago : p);
        setPagosData(updatedPagosData);
        navigate('/dashboard');  // Redirige al dashboard después de guardar
    };

    if (!pago) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Editar Pago</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Cantidad</label>
                    <input
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Fecha</label>
                    <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default EditarPago;
