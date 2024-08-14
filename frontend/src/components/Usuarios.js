import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/Usuarios.css';
import Nav from './Nav';

const Usuarios = ({ users, setUsers, setUsuarioLogueado, pagosData }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Simula una carga de datos inicial
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    /* useEffect(() => {
        // Agrega usuario por defecto si no existe
        const defaultUsers = [
            {
                id: 1,
                nombre: 'Administrador',
                rol: 'Administrador',
                email: 'DentalVizcaya@gmail.com',
                noDocumento: '00000000',
                tipoDocumento: 'DNI',
                telefono: '000000000',
                password: '12345',
                photo: ''
            },
            {
                id: 2,
                nombre: 'Secretaria',
                rol: 'Secretaria',
                email: 'secretaria@gmail.com',
                noDocumento: '00000001',
                tipoDocumento: 'DNI',
                telefono: '000000001',
                password: '12345',
                photo: ''
            },
            {
                id: 3,
                nombre: 'Médico',
                rol: 'Médico',
                email: 'medico@gmail.com',
                noDocumento: '00000002',
                tipoDocumento: 'DNI',
                telefono: '000000002',
                password: '12345',
                photo: ''
            }
        ];
        
        if (users.length === 0) {
            setUsers(defaultUsers);
        } else {
            setFilteredUsers(users);
        }
    }, [users, setUsers]); */

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=getusers');
                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }
    , [setUsers]);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddUser = () => {
        navigate('/agregar-usuario');
    };

    const handleEditUser = (id) => {
        navigate(`/editar-usuario/${id}`);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            const deleteUser = async () => {
                try {
                    const response = await fetch('http://localhost/sisDenatal/backend2/public/index.php?action=deleteuser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id })
                    });
                    const data = await response.json();
                    console.log(data);
                    setUsers(users.filter(user => user.id !== id));
                    setFilteredUsers(users.filter(user => user.id !== id));
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            deleteUser();
        }
    };

    const handleSetUsuarioLogueado = (user) => {
        setUsuarioLogueado(user);
    };

    return (
        <div className="usuarios-body">
            <Nav />
            <div className="usuarios-header">
                <button className="btn-back-us" onClick={() => navigate('/dashboard')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button className="btn-add" onClick={handleAddUser}>
                    <FontAwesomeIcon icon={faPlus} /> Agregar Usuario
                </button>
                <div className="search-bar">
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
            <div className="usuarios-container">
                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Rol</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td><img src={user.photo} alt={user.nombre} className="user-photo" /></td>
                                <td>{user.rol}</td>
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                                <td>{user.telefono}</td>
                                <td>
                                    <button className="btn-edit-u" onClick={() => handleEditUser(user.id)}>Editar</button>
                                    <button className="btn-delete-u" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
};

export default Usuarios;
