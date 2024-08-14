import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CobrarPago.css';

const CobrarPago = ({ pagosData, setPagosData }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const pago = pagosData.find(p => p.id === parseInt(id));

    const [monto, setMonto] = useState('');
    const [recibio, setRecibio] = useState('');

    if (!pago) {
        return <div>Pago no encontrado</div>;
    }

    const handleChange = (e) => {
        setMonto(e.target.value);
    };

    const handleRecibioChange = (e) => {
        setRecibio(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseFloat(monto) > 0 && parseFloat(monto) <= pago.saldo) {
            const nuevoHistorial = [
                ...pago.historial,
                { fecha: new Date().toLocaleDateString(), hora: new Date().toLocaleTimeString(), monto, recibio }
            ];
            const nuevoPago = {
                ...pago,
                pagado: pago.pagado + parseFloat(monto),
                saldo: pago.saldo - parseFloat(monto),
                historial: nuevoHistorial
            };
            setPagosData(pagosData.map(p => p.id === pago.id ? nuevoPago : p));
            navigate(`/ver-pago/${id}`);
        } else {
            alert('El monto debe ser mayor que 0 y no exceder el saldo.');
        }
    };

    const handleCancel = () => {
        navigate(`/ver-pago/${id}`);
    };

    return (
        <div className="cobrar-pago-container">
            <h2>Cobrar Pago</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="monto">Monto:</label>
                    <input 
                        type="number" 
                        id="monto" 
                        value={monto} 
                        onChange={handleChange} 
                        min="0" 
                        step="0.01" 
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="recibio">Recibió:</label>
                    <input 
                        type="text" 
                        id="recibio" 
                        value={recibio} 
                        onChange={handleRecibioChange} 
                        required
                    />
                </div>
                <button type="submit" className="btn-cobrar">Cobrar</button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>Cancelar</button>
            </form>
        </div>
    );
};

export default CobrarPago;
