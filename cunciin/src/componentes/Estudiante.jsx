import React from 'react';
import { Link } from 'react-router-dom';
import './Estudiante.css';
const Estudiante = () => {
  return (
    <div className="home-estudiante-container">
      <h1>Bienvenido al Home del Estudiante</h1>
      <div className="home-estudiante-secciones">

     
        <div className="seccion-perfil">
          <h2>Información del Usuario</h2>
          <p>Aquí puedes ver y editar tu información personal.</p>
          <Link to="/perfil" className="btn-perfil">Ver Perfil</Link>
        </div>

        
        <div className="seccion-incidencias">
          <h2>Gestión de Incidencias</h2>
          <p>Puedes reportar una nueva incidencia o ver el estado de tus incidencias.</p>
          <div className="botones-incidencias">
            <Link to="/reportar-incidencia" className="btn-crear-incidencia">Crear Incidencia</Link>
            <Link to="/ver-incidencias" className="btn-ver-incidencias">Ver Incidencias</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estudiante;
