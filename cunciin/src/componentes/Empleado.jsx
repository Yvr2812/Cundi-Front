import React, { useState } from 'react';

const Empleado = () => {
  const [currentIncidencia, setCurrentIncidencia] = useState(null);
  const [informe, setInforme] = useState('');
  const [solucion, setSolucion] = useState('');
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario

  // Datos de ejemplo de incidencias asignadas
  const incidenciasAsignadas = [
    { id: 1, nombre: 'Fuga de agua en el aula 202', estado: 'En progreso' },
    { id: 2, nombre: 'Fallo en el proyector del laboratorio', estado: 'Pendiente' },
    { id: 3, nombre: 'Silla rota en la cafetería', estado: 'Resuelto' },
  ];

  const handleVerEstado = (incidenciaId) => {
    alert(`Estado actual de la incidencia: ${incidenciaId}`); // Usar backticks para la interpolación
  };

  const handleEnviarInforme = (incidenciaId) => {
    setCurrentIncidencia(incidenciaId);
    setShowForm(true); // Muestra el formulario al hacer clic en "Enviar Informe"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Informe enviado:\nInforme: ${informe}\nSolución: ${solucion}`); // Usar backticks para la interpolación
    setShowForm(false); // Oculta el formulario después de enviar
    // Aquí puedes agregar lógica para enviar el informe a tu backend
  };

  return (
    <div className="empleado-dashboard">
      <header>
        <a href="#" className="logo">Cundi-incidencias</a>
        <nav>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <h2>Incidencias Asignadas</h2>

      <div className="incidencias-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Ver Estado</th>
              <th>Reportar Incidencia</th>
            </tr>
          </thead>
          <tbody>
            {incidenciasAsignadas && incidenciasAsignadas.length > 0 ? (
              incidenciasAsignadas.map((incidencia) => (
                <tr key={incidencia.id}>
                  <td>{incidencia.id}</td>
                  <td>{incidencia.nombre}</td>
                  <td>{incidencia.estado}</td>
                  <td>
                    <button onClick={() => handleVerEstado(incidencia.id)}>
                      Ver Estado
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleEnviarInforme(incidencia.id)}>
                      Enviar Informe
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay incidencias asignadas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Formulario para enviar informe */}
      {showForm && (
        <div className="informe-form">
          <h2>Enviar Informe para Incidencia ID: {currentIncidencia}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Informe:</label>
              <textarea
                value={informe}
                onChange={(e) => setInforme(e.target.value)}
                placeholder="Escribe tu informe aquí..."
                required
              ></textarea>
            </div>
            <div>
              <label>Solución:</label>
              <textarea
                value={solucion}
                onChange={(e) => setSolucion(e.target.value)}
                placeholder="Escribe la solución de la incidencia aquí..."
                required
              ></textarea>
            </div>
            <button type="submit">Enviar Informe</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Empleado;
