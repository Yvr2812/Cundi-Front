// src/componentes/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    navigate('/'); // Redirigir al inicio después de cerrar sesión
  };

  return (
    
    <div className="dashboard-container">
      <header>
        <a href="#" className="logo">Cundi-incidencias</a>
        
        <nav>
          <ul>
            <li><button onClick={() => navigate("/")}>Inicio</button></li>
            <li><button onClick={() => navigate("/admin")}>Administrador</button></li>
            <li><button onClick={() => navigate("/empleado")}>Empleado</button></li>
            <li><button onClick={() => navigate("/estudiante")}>Estudiante</button></li>
            <li><button onClick={() => navigate("/cerrar-sesion")}>Cerrar Sesión</button></li>
          </ul>
        </nav>
      </header>

      <section className="Zona1"></section>

      <h2>Bienvenido, {user ? user.nombre_usuario : "Usuario"}!</h2>
      <p>Has iniciado sesión correctamente en la plataforma.</p>
      <div className="dashboard-actions">
        <button onClick={() => navigate('/reportar-incidencia')} className="dashboard-btn">Reportar Incidencia</button>
        <button onClick={() => navigate('/ver-incidencias')} className="dashboard-btn">Ver Incidencias</button>
      </div>
      <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
    </div>
  );
};

export default Home;

