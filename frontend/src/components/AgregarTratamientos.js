import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/AgregarTratamientos.css';

const AgregarTratamiento = ({ tratamientosData, setTratamientosData }) => {
    const navigate = useNavigate();
    const [tratamientoData, setTratamientoData] = useState({
        tratamiento: '',
        costo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTratamientoData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=addtratamiento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tratamiento: tratamientoData.tratamiento,
                costo: tratamientoData.costo
            })
        });
        const data = await response.json();
        console.log(data);
        if (data.message === 'exito') {
            setTratamientosData(prevData => [...prevData, {
                id: data.id,
                tratamiento: tratamientoData.tratamiento,
                costo: tratamientoData.costo
            }]
            )
        } else {
            alert('Error al agregar tratamiento');
        }
        navigate('/tratamientos');
    };

    const handleCancel = () => {
        navigate('/tratamientos');
    };

    return (
        <div className="addtratamiento-body">
            <div className="agregar-tratamiento-container">
                <div className="header">
                    <h2>Agregar Tratamiento</h2>
                    <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleCancel} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-table">
                        <div className="form-group">
                            <label htmlFor="tratamiento">Tratamiento:</label>
                            <input type="text" id="tratamiento" name="tratamiento" value={tratamientoData.tratamiento} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="costo">Costo:</label>
                            <input type="number" id="costo" name="costo" value={tratamientoData.costo} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn-guardar">Guardar</button>
                        <button type="button" className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgregarTratamiento;
