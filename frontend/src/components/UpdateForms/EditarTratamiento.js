import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarTratamiento = ({ tratamientosData, setTratamientosData }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tratamientoData, setTratamientoData] = useState(null);

    useEffect(() => {
        const tratamiento = tratamientosData.find(t => t.id === parseInt(id));
        if (tratamiento) {
            setTratamientoData(tratamiento);
        }
    }, [id, tratamientosData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTratamientoData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost/vizcaya-full-stack/backend2/public/index.php?action=updatetratamiento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: tratamientoData.id,
                tratamiento: tratamientoData.tratamiento,
                costo: tratamientoData.costo
            })
        });
        
        const data = await response.json();
        console.log(data);
        if (data.message === 'exito') {
            const newTratamientosData = tratamientosData.map(tratamiento => {
                if (tratamiento.id === tratamientoData.id) {
                    return {
                        ...tratamiento,
                        tratamiento: tratamientoData.tratamiento,
                        costo: tratamientoData.costo
                    };
                }
                return tratamiento;
            });
            setTratamientosData(newTratamientosData);
        } else {
            alert('Error al editar tratamiento');
        }

        navigate('/tratamientos');
    };

    const handleCancel = () => {
        navigate('/tratamientos');
    };

    if (!tratamientoData) return <p>Cargando...</p>;

    return (
        <div className="addtratamiento-body">
            <div className="agregar-tratamiento-container">
                <div className="header">
                    <h2>Editar Tratamiento</h2>
                    <button onClick={handleCancel}>Cancelar</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-table">
                        <div className="form-group">
                            <label htmlFor="tratamiento">Tratamiento:</label>
                            <input 
                                type="text" 
                                id="tratamiento" 
                                name="tratamiento" 
                                value={tratamientoData.tratamiento} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="costo">Costo:</label>
                            <input 
                                type="number" 
                                id="costo" 
                                name="costo" 
                                value={tratamientoData.costo} 
                                onChange={handleChange} 
                                required 
                            />
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

export default EditarTratamiento;
