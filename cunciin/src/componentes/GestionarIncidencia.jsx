import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GestionarIncidencia.css';
import { useNavigate } from 'react-router-dom';
import "./GestionarIncidencias.css";

const GestionarIncidencia = () => {
  const navigate = useNavigate();
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseIncidencias = await axios.get('https://localhost:7124/api/Incidencia/ObtenerHistorialIncidencia');
        setIncidencias(responseIncidencias.data.incidencia);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener los datos:', err);
        setError('Error al obtener los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAsignarEmpleado = (idIncidencia) => {
    // Redirigir al componente AsignarIncidencia con el ID de la incidencia
    navigate(`/asignar-empleado/${idIncidencia}`);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  if (loading) return <p>Cargando incidencias...</p>;
  if (error) return <p>{error}</p>;

  // Filtrar incidencias según el estado
  const incidenciasPendientes = incidencias.filter((incidencia) => incidencia.id_estado === 1);
  const incidenciasEnProceso = incidencias.filter((incidencia) => incidencia.id_estado === 2);
  const incidenciasFinalizadas = incidencias.filter((incidencia) => incidencia.id_estado === 3);

  return (
    <div className="gestionar-incidencias-container">
      <h1>Historial de Incidencias</h1>

      {/* Incidencias pendientes (Estado 1) */}
      <h2>Incidencias Pendientes</h2>
      <table className="incidencias-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha de Inicio</th>
            <th>Estado</th>
            <th>Asignar</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {incidenciasPendientes.map((incidencia, index) => (
            <tr key={incidencia.id_incidencia}>
              <td>{index + 1}</td>
              <td>{incidencia.nombre_incidencia}</td>
              <td>{incidencia.descripcion}</td>
              <td>{new Date(incidencia.fecha_inicio).toLocaleDateString()}</td>
              <td>{incidencia.nombre_estado}</td>
              <td>
                <button onClick={() => handleAsignarEmpleado(incidencia.id_incidencia)} className="asignar-button">
                  Asignar
                </button>
              </td>
              <td>
                {incidencia.imagen ? (
                  <img
                    src={`data:image/jpeg;base64,${incidencia.imagen}`}
                    alt="Incidencia"
                    className="imagen-incidencia"
                    onClick={() => openModal(`data:image/jpeg;base64,${incidencia.imagen}`)}
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                  />
                ) : (
                  'No disponible'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Incidencias en proceso (Estado 2) */}
      <h2>Incidencias en Proceso</h2>
      <table className="incidencias-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha de Inicio</th>
            <th>Estado</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {incidenciasEnProceso.map((incidencia, index) => (
            <tr key={incidencia.id_incidencia}>
              <td>{index + 1}</td>
              <td>{incidencia.nombre_incidencia}</td>
              <td>{incidencia.descripcion}</td>
              <td>{new Date(incidencia.fecha_inicio).toLocaleDateString()}</td>
              <td>{incidencia.nombre_estado}</td>
              <td>
                {incidencia.imagen ? (
                  <img
                    src={`data:image/jpeg;base64,${incidencia.imagen}`}
                    alt="Incidencia"
                    className="imagen-incidencia"
                    onClick={() => openModal(`data:image/jpeg;base64,${incidencia.imagen}`)}
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                  />
                ) : (
                  'No disponible'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Incidencias finalizadas (Estado 3) */}
      <h2>Incidencias Finalizadas</h2>
      <table className="incidencias-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha de Inicio</th>
            <th>Estado</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {incidenciasFinalizadas.map((incidencia, index) => (
            <tr key={incidencia.id_incidencia}>
              <td>{index + 1}</td>
              <td>{incidencia.nombre_incidencia}</td>
              <td>{incidencia.descripcion}</td>
              <td>{new Date(incidencia.fecha_inicio).toLocaleDateString()}</td>
              <td>{incidencia.nombre_estado}</td>
              <td>
                {incidencia.imagen ? (
                  <img
                    src={`data:image/jpeg;base64,${incidencia.imagen}`}
                    alt="Incidencia"
                    className="imagen-incidencia"
                    onClick={() => openModal(`data:image/jpeg;base64,${incidencia.imagen}`)}
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                  />
                ) : (
                  'No disponible'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Incidencia Agrandada" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarIncidencia;
