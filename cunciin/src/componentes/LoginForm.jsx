import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css"

const LoginForm = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate=useNavigate();

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
                alert('Login exitoso', data);
                navigate('/home')
            } else {
                alert('Error en el login', data.message);
            }
        } catch (error) {
            alert('Error:', error);
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
                    value={contrasena} // Asegúrate de que el valor sea "contrasena" y no "password"
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </form>
    );
};

export default LoginForm;
