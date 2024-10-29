import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
const Admin = () => {
  return (
    <div className="home-administrador-container">
      <h1>Bienvenido al Home del Administrador</h1>
      <div className="home-administrador-secciones">

        <div className="seccion-incidencias">
          <h2>Gestión de Incidencias</h2>
          <p>Puedes gestionar todas las incidencias reportadas.</p>
          <div className="botones-incidencias">
            <Link to="/gestionar-incidencia" className="btn-gestionar-incidencias">Gestionar Incidencias</Link>
          </div>
        </div>

        <div className="seccion-empleados">
          <h2>Gestión de Empleados</h2>
          <p>Puedes agregar, editar o eliminar empleados.</p>
          <div className="botones-empleados">
            <Link to="/gestionar-empleados" className="btn-gestionar-empleados">Gestionar Empleados</Link>
          </div>
        </div>

        <div className="seccion-reportes">
          <h2>Generar Reportes</h2>
          <p>Puedes generar reportes de incidencias y empleados.</p>
          <div className="botones-reportes">
            <Link to="/generar-reportes" className="btn-generar-reportes">Generar Reportes</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;
