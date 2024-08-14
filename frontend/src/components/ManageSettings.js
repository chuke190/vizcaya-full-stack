import React, { useState } from 'react';

const ManageSettings = () => {
    const [settings, setSettings] = useState({
        reminderTime: 30, // Recordatorio en minutos
        allowOverlap: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para guardar ajustes de la agenda
        console.log('Ajustes guardados:', settings);
    };

    return (
        <div>
            <h2>Ajustes de la Agenda</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tiempo de recordatorio (minutos):
                    <input type="number" name="reminderTime" value={settings.reminderTime} onChange={handleChange} required />
                </label>
                <label>
                    Permitir solapamientos:
                    <input type="checkbox" name="allowOverlap" checked={settings.allowOverlap} onChange={handleChange} />
                </label>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default ManageSettings;
