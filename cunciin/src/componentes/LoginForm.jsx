import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import "./LoginForm.css";

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const value = document.cookie;
    const parts = value.split('; ');
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].split('=');
        if (part[0] === name) return part[1];
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

const LoginForm = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = new URLSearchParams();
        loginData.append('correo', correo);
        loginData.append('contrasena', contrasena);

        try {
            const response = await fetch('https://localhost:7124/api/Persona/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 
                },
                body: loginData.toString(), 
            });

            const data = await response.json(); 
            if (response.ok) {
                await redireccionar(); // Llama a redireccionar aquí
            } else {
                setErrorMessage(data.message || 'Error en el login');
            }
        } catch (error) {
            setErrorMessage('Error: ' + error.message);
        }
    };

    const redireccionar = async () => {
        try {
            const response = await fetch(`https://localhost:7124/api/Persona/TraerDatosPersona?correo=${encodeURIComponent(correo)}`, {
                method: 'GET'
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);

                setCookie('userId', result.id_usuario1, 7);
                setCookie('userRole', result.id_rol1, 7);
                
                // Redirección según el rol del usuario
                switch (result.id_rol1) {
                    case 1:
                        navigate('/estudiante'); 
                        break;
                    case 2:
                        navigate('/empleado'); 
                        break;
                    case 3:
                        navigate('/admin');     
                        break;
                    default:
                        setErrorMessage('Rol no reconocido.');
                        break;
                }
            } else {
                const error = await response.text();
                setErrorMessage(`Error: ${error}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setErrorMessage(`Error: ${error.message || 'Desconocido'}`);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="contrasena" className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="contrasena"
                    value={contrasena} 
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            <p>
                ¿Olvidaste tu contraseña? <Link to="/recuperar-contrasena">Recupérala aquí</Link>
            </p>
        </form>
    );
};

export default LoginForm;