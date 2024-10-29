import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./VerIncidencia.css";


const getCookie = (name) => {
  const value = document.cookie;
  const parts = value.split('; ');
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].split('=');
    if (part[0] === name) return part[1];
  }
  return null;
};

const VerIncidencias = () => {
  const userId = getCookie('userId');
  const [incidencias, setIncidencias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncidencias = async () => {
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(
          `https://localhost:7124/api/Usuario/ListaIncidenciaUsuario?id_usuario=${userId}`,
          { method: 'GET' }
        );

        if (response.ok) {
          const fetchedIncidencias = await response.json();
          setIncidencias(fetchedIncidencias);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener las incidencias.');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncidencias();
  }, [userId, navigate]);

  const handleEdit = (incidencia) => {
    localStorage.setItem('id_incidencia', incidencia.id_incidencia);
    navigate(`/editar-incidencia/${incidencia.id_incidencia}`);
  };

  const handleDelete = (idIncidencia) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar esta incidencia?`);
    if (!confirmDelete) return;
  
    fetch(`https://localhost:7124/api/Incidencia/EliminarIncidencia?id_incidencia=${idIncidencia}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => {
      if (response.ok) {
     
        setIncidencias(incidencias.filter(incidencia => incidencia.id_incidencia !== idIncidencia));
        alert('Incidencia eliminada exitosamente.');
      } else if (response.status === 404) {
        alert('NO se puede eliminar la incidencia porque ya ha pasado el tiempo requerido.'); 
      } else {
        return response.json().then(errorData => {
          alert(`Error al eliminar la incidencia: ${errorData.message || 'Error desconocido.'}`);
        });
      }
    })
    .catch(error => {
      console.error('Error al eliminar la incidencia:', error);
    });
};

  return (
    <div>
      <h2>Mis Incidencias Reportadas</h2>
      {isLoading && <p>Cargando incidencias...</p>}
      {error && <p className="error-message">{error}</p>}
      {incidencias.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID Incidencia</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Categoría</th>
              <th>Ubicación</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {incidencias.map((incidencia) => (
              <tr key={incidencia.id_incidencia}>
                <td>{incidencia.id_incidencia}</td>
                <td>{incidencia.nombre_incidencia}</td>
                <td>{incidencia.descripcion}</td>
                <td>
                  <img src={incidencia.imagen} alt="Imagen de la incidencia" style={{ width: '100px', height: 'auto' }} />
                </td>
                <td>{incidencia.fecha_inicio}</td>
                <td>{incidencia.fecha_fin}</td>
                <td>{incidencia.id_usuario}</td>
                <td>{incidencia.id_estado}</td>
                <td>{incidencia.id_categoria}</td>
                <td>{incidencia.id_ubicacion}</td>
                <td>
                  <button onClick={() => handleEdit(incidencia)}>Editar</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(incidencia.id_incidencia, incidencia.nombre_incidencia)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron incidencias reportadas.</p>
      )}
    </div>
  );
};

export default VerIncidencias;