import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgregarPago = ({ setPagosData }) => {
    const [paciente, setPaciente] = useState('');
    const [tratamiento, setTratamiento] = useState('');
    const [enfermedad, setEnfermedad] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [costo, setCosto] = useState('');
    const [pagado, setPagado] = useState(0);
    const [saldo, setSaldo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoPago = {
            id: new Date().getTime(), // Generar un ID único
            paciente,
            tratamiento,
            enfermedad,
            fecha,
            hora,
            costo: parseFloat(costo),
            pagado: parseFloat(pagado),
            saldo: parseFloat(saldo),
            recibidoPor: '' // Inicialmente vacío
        };
        setPagosData(prevState => [...prevState, nuevoPago]);
        navigate('/pagos'); // Redirigir a la lista de pagos
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={paciente} onChange={(e) => setPaciente(e.target.value)} placeholder="Paciente" required />
            <input type="text" value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} placeholder="Tratamiento" required />
            <input type="text" value={enfermedad} onChange={(e) => setEnfermedad(e.target.value)} placeholder="Enfermedad" />
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
            <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
            <input type="number" value={costo} onChange={(e) => setCosto(e.target.value)} placeholder="Costo" required />
            <input type="number" value={pagado} onChange={(e) => setPagado(e.target.value)} placeholder="Pagado" />
            <input type="number" value={saldo} onChange={(e) => setSaldo(e.target.value)} placeholder="Saldo" />
            <button type="submit">Agregar Pago</button>
        </form>
    );
};

export default AgregarPago;
