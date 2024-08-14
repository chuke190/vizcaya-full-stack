import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/Tratamientos.css';
import Nav from './Nav';  // Asegúrate de que esta línea está presente

const Tratamientos = ({ tratamientosData, setTratamientosData }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTratamientos, setSelectedTratamientos] = useState([]);

    useEffect(() => {
        const fetchTratamientos = async () => {
            try {
                const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=gettratamientos');
                const data = await response.json();
                setTratamientosData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchTratamientos();
    }, [setTratamientosData]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddTratamiento = () => {
        navigate('/agregar-tratamientos');
    };

    const handleEditTratamiento = (id) => {
        navigate(`/editar-tratamiento/${id}`);
    };

    const handleDeleteTratamiento = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este tratamiento?')) {
            const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=deletetratamiento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });
            const data = await response.json();
            console.log(data);
            if (data.message === 'exito') {
                const newTratamientosData = tratamientosData.filter(tratamiento => tratamiento.id !== id);
                setTratamientosData(newTratamientosData);
            } else {
                alert('Error al eliminar tratamiento');
            }
        }
    };

    const handleSelectTratamiento = (id) => {
        setSelectedTratamientos((prevSelected) => 
            prevSelected.includes(id) 
                ? prevSelected.filter(tratamientoId => tratamientoId !== id) 
                : [...prevSelected, id]
        );
    };

    const handleDeleteSelected = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar los tratamientos seleccionados?')) {
            const newTratamientosData = tratamientosData.filter(tratamiento => !selectedTratamientos.includes(tratamiento.id));
            setTratamientosData(newTratamientosData);
            setSelectedTratamientos([]);
        }
    };

    const handleDeleteAll = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar todos los tratamientos?')) {
            setTratamientosData([]);
        }
    };

    return (
        <div className="tratamientos-body">
            <Nav />  
            <div className="tratamientos-header">
                <div className="tratamientos-header-left">
                    <button className="boton-back" onClick={() => navigate('/dashboard')}>
                        <FontAwesomeIcon icon={faArrowLeft} /> 
                    </button>
                    <button className="boton-add" onClick={handleAddTratamiento}>
                        <FontAwesomeIcon icon={faPlus} /> Agregar Tratamiento
                    </button>
                </div>
                <div className="tratamientos-header-right">
                    <div className="search-bars">
                        <input 
                            type="text" 
                            placeholder="Buscar..." 
                            value={searchTerm} 
                            onChange={handleSearchChange}
                        />
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </div>
                    <button className="boton-delete-all" onClick={handleDeleteAll}>
                        <FontAwesomeIcon icon={faTrash} /> Eliminar Todo
                    </button>
                </div>
            </div>
            <div className="tratamientos-container">
                <table className="tratamientos-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tratamiento</th>
                            <th>Precio</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tratamientosData
                            .filter(tratamiento =>
                                tratamiento.tratamiento.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map(tratamiento => (
                                <tr key={tratamiento.id}>
                                    <td>{tratamiento.numeroTratamiento}</td>
                                    <td>{tratamiento.tratamiento}</td>
                                    <td>{tratamiento.costo}</td>
                                    <td>
                                        <button className="boton-edit" onClick={() => handleEditTratamiento(tratamiento.id)}>Editar</button>
                                        <button className="boton-delete" onClick={() => handleDeleteTratamiento(tratamiento.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tratamientos;
