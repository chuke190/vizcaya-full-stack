import React, { useState } from 'react';

const ManageWorkHours = () => {
    const [workHours, setWorkHours] = useState({
        doctor: '',
        days: [],
        startTime: '',
        endTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkHours(prev => ({ ...prev, [name]: value }));
    };

    const handleDayChange = (e) => {
        const { value, checked } = e.target;
        setWorkHours(prev => ({
            ...prev,
            days: checked ? [...prev.days, value] : prev.days.filter(day => day !== value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para guardar horarios de trabajo
        console.log('Horarios de trabajo guardados:', workHours);
        // Limpiar formulario
        setWorkHours({ doctor: '', days: [], startTime: '', endTime: '' });
    };

    return (
        <div>
            <h2>Gestionar Horarios de Trabajo</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Doctor:
                    <input type="text" name="doctor" value={workHours.doctor} onChange={handleChange} required />
                </label>
                <label>
                    Días:
                    <div>
                        <label><input type="checkbox" value="Lunes" onChange={handleDayChange} /> Lunes</label>
                        <label><input type="checkbox" value="Martes" onChange={handleDayChange} /> Martes</label>
                        <label><input type="checkbox" value="Miércoles" onChange={handleDayChange} /> Miércoles</label>
                        <label><input type="checkbox" value="Jueves" onChange={handleDayChange} /> Jueves</label>
                        <label><input type="checkbox" value="Viernes" onChange={handleDayChange} /> Viernes</label>
                        <label><input type="checkbox" value="Sábado" onChange={handleDayChange} /> Sábado</label>
                        <label><input type="checkbox" value="Domingo" onChange={handleDayChange} /> Domingo</label>
                    </div>
                </label>
                <label>
                    Hora de inicio:
                    <input type="time" name="startTime" value={workHours.startTime} onChange={handleChange} required />
                </label>
                <label>
                    Hora de fin:
                    <input type="time" name="endTime" value={workHours.endTime} onChange={handleChange} required />
                </label>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default ManageWorkHours;
