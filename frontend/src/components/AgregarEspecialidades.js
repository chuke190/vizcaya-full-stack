import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/AgregarEspecialidades.css';

const AgregarEspecialidades = ({ especialidadesData, setEspecialidadesData }) => {
    const navigate = useNavigate();
    const [especialidadData, setEspecialidadData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEspecialidadData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=addespecialidad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: especialidadData.nombre
            })
        });

        const data = await response.json();

        if (data.message === 'exito') {
            setEspecialidadesData([
                ...especialidadesData,
                {
                    id: data.id,
                    nombre: especialidadData.nombre
                }
            ]);
            navigate('/especialidades');
        };
    }

    const handleCancel = () => {
        navigate('/especialidades');
    };

    return (
        <div className="addusua-body">
            <div className="agregar-usuario-container">
                <div className="header">
                    <h2>Nueva Especialidad</h2>
                    <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => navigate('/especialidades')} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-table">
                        <div className="form-group">
                            <label htmlFor="nombre">Especialidad:</label>
                            <input type="text" id="nombre" name="nombre" value={especialidadesData.nombre} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="button-group-es">
                        <button type="submit" className="btn-guardar-es">Guardar</button>
                        <button type="button" className="btn-cancelar-es" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgregarEspecialidades;
