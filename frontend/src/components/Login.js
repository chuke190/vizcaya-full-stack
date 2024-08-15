import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';

const Login = ({ setLoggedInUser }) => {
    /* const [nombreUsuario, setNombreUsuario] = useState(''); */
    const [email, setEmail] = useState('');
    const [contra, setContra] = useState('');
    const [mensaje, setMensaje] = useState('');
    const { setAuth } = React.useContext(AuthContext);
    const navigate = useNavigate();

    /* const defaultUsers = [
        {
            email: 'DentalVizcaya@gmail.com',
            password: '12345',
            nombre: 'Administrador',
            rol: 'Administrador',
        },
        {
            email: 'secretaria@gmail.com',
            password: '12345',
            nombre: 'Secretaria',
            rol: 'Secretaria',
        },
        {
            email: 'medico@gmail.com',
            password: '12345',
            nombre: 'Médico',
            rol: 'Médico',
        }
    ];

    const handleLogin = (e) => {
        e.preventDefault();
     
        const user = defaultUsers.find(
            (user) => user.email === nombreUsuario && user.password === contraseña
        );

        if (user) {
            setLoggedInUser(user);
            navigate('/dashboard');
        } else {
            setMensaje('Credenciales incorrectas.');
        }
    }; */

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost/vizcaya-full-stack/backend2/controller/AuthController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                contra: contra,
            }),
        });

        const data = await response.json();

        if (data.message === "exito") {
            setLoggedInUser(data.user);
            navigate('/dashboard');
        } else {
            setMensaje('Credenciales incorrectas.');
        }
    };

    return (
        <div className="login-container">
            <img src="/images/dentalvizcaya.png" alt="Dental Vizcaya" className="logo" />
            <form className="formlog" onSubmit={handleLogin}>
                <div className="form-group">
                    <input
                        className='input'
                        placeholder='E-mail'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        className='input'
                        placeholder='Contraseña'
                        type="password"
                        value={contra}
                        onChange={(e) => setContra(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">Ingresar</button>
            </form>
            {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
    );
};

export default Login;
