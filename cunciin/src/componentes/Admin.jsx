import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css'; 

const Admin = ({ incidencias }) => {
  const navigate = useNavigate();

  const handleCrearEmpleado = () => {
    navigate('/crear-empleado'); // Redirige a la página de creación de empleados
  };

  const handleAsignarIncidencia = (incidenciaId) => {
    navigate(`/asignar-incidencia/${incidenciaId}`); // Corregido: usar backticks
  };

  const handleCambiarEstado = (incidenciaId) => {
    navigate(`/cambiar-estado/${incidenciaId}`); // Corregido: usar backticks
  };

  const handleGenerarReporte = () => {
    // Aquí implementas la lógica para generar reportes
    alert("Reporte generado");
  };

  return (
    <div className="admin-dashboard">
      <header>
        <a href="#" className="logo">Cundi-incidencias</a>
        <nav>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#" onClick={() => navigate('/logout')}>Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <section className="Zona1"></section>

      <h2>Panel del Administrador</h2>

      <div className="admin-actions">
        <button onClick={handleCrearEmpleado} className="admin-btn">
          Crear Empleado
        </button>
        <button onClick={handleGenerarReporte} className="admin-btn">
          Generar Reporte
        </button>
      </div>

      <div className="incidencias-list">
        <h3>Lista de Incidencias</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Asignar Empleado</th>
              <th>Cambiar Estado</th>
            </tr>
          </thead>
          <tbody>
            {incidencias && incidencias.length > 0 ? (
              incidencias.map((incidencia) => (
                <tr key={incidencia.id}>
                  <td>{incidencia.id}</td>
                  <td>{incidencia.nombre}</td>
                  <td>{incidencia.estado}</td>
                  <td>
                    <button onClick={() => handleAsignarIncidencia(incidencia.id)}>
                      Asignar Empleado
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleCambiarEstado(incidencia.id)}>
                      Cambiar Estado
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay incidencias registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
