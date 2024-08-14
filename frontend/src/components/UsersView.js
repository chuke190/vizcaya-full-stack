import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/UsersView.css'; // Asegúrate de que este archivo CSS exista y contenga los estilos necesarios
import Nav from './Nav';

const UsersView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { users: initialUsers = [] } = location.state || {};

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setFilteredUsers(
      initialUsers.filter(user =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, initialUsers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="viewbody">
      <Nav />
      <div className="historial-citas-header">
            <div className="search-bar-cv">
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                />
                <FontAwesomeIcon icon={faSearch} className="search-icon-cv" />
            </div>
        </div>
      {isLoading ? (
        <div className="loading-container">
          <p>Cargando...</p>
        </div>
      ) : (
        <div className="usuarios-view">
          <h1>Listado de Usuarios</h1>
          <p className="usuarios-count">Total de Usuarios Registrados: {filteredUsers.length}</p>
          <table className="view-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Rol</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length ? (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td><img src={user.photo} alt={user.nombre} className="user-photo" /></td>
                    <td>{user.rol}</td>
                    <td>{user.nombre}</td>
                    <td>{user.email}</td>
                    <td>{user.telefono}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No hay usuarios disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersView;
