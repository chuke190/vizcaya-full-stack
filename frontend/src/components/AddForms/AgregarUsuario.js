import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/AgregarUsuario.css';

const AgregarUsuario = ({ users, setUsers }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nombre: '',
        rol: '',
        noDocumento: '',
        email: '',
        tipoDocumento: '',
        telefono: '',
        password: '',
        confirmPassword: '',
        photo: ''
    });

    const [error, setError] = useState('');

    const tipoUsuarioOptions = ['Administrador', 'Médico', 'Secretaria'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError('El archivo es demasiado grande. El tamaño máximo es 2 MB.');
                return;
            }
            setError('');
            const reader = new FileReader();
            reader.onload = (upload) => {
                setUserData(prevState => ({
                    ...prevState,
                    photo: upload.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.nombre || !userData.rol || !userData.noDocumento || !userData.email || !userData.tipoDocumento || !userData.telefono || !userData.password || !userData.confirmPassword) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        if (userData.password !== userData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setError('');
        const response = await fetch('http://localhost/vizcaya-full-stack/backend2/public/index.php?action=adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: userData.nombre,
                rol: userData.rol,
                noDocumento: userData.noDocumento,
                email: userData.email,
                tipoDocumento: userData.tipoDocumento,
                telefono: userData.telefono,
                contra: userData.password
            })
        });
        const data = await response.json();
        if (data.message === 'exito') {
            setUsers([
                ...users,
                {
                    id: data.id,
                    nombre: userData.nombre,
                    rol: userData.rol,
                    noDocumento: userData.noDocumento,
                    email: userData.email,
                    tipoDocumento: userData.tipoDocumento,
                    telefono: userData.telefono,
                    contra: userData.password,
                    photo: userData.photo
                }
            ]);
            navigate('/usuarios');
        } else {
            setError(data.message);
        }
    };

    const handleCancel = () => {
        navigate('/usuarios');
    };

    return (
        <div className="addusua-body">
            <div className="agregar-usuario-container">
                <div className="header">
                    <h2>Registro de Nuevo Usuario</h2>
                    <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleCancel} />
                </div>
                <form onSubmit={handleSubmit} className="rect">
                    <div className="form-tablee">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                value={userData.nombre} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rol">Rol:</label>
                            <select 
                                id="rol" 
                                name="rol" 
                                value={userData.rol} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="">Seleccionar rol</option>
                                {tipoUsuarioOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                            <input 
                                type="text" 
                                id="tipoDocumento" 
                                name="tipoDocumento" 
                                value={userData.tipoDocumento} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="noDocumento">No. Documento:</label>
                            <input 
                                type="number" 
                                id="noDocumento" 
                                name="noDocumento" 
                                value={userData.noDocumento} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono:</label>
                            <input 
                                type="tel" 
                                id="telefono" 
                                name="telefono" 
                                value={userData.telefono} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={userData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="photo">Foto:</label>
                            <input 
                                type="file" 
                                id="photo" 
                                name="photo" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                            {userData.photo && <img src={userData.photo} alt="Preview" className="photo-preview" />}
                        </div>
                        <div className="header-subtitulo">
                            <h3>Contraseña de Usuario</h3>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                value={userData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                value={userData.confirmPassword} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="button-group-us">
                        <button type="submit" className="btn-guardar-us">Guardar</button>
                        <button type="button" className="btn-cancelar-us" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default AgregarUsuario;
