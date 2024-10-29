import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GestionarEmpleado.css';


const GestionarEmpleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get('https://localhost:7124/api/Empleado/ListaEmpleados');
        setEmpleados(response.data);
      } catch (err) {
        console.error('Error al obtener empleados:', err);
        setError('Error al cargar los empleados');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  const handleCrearEmpleado = () => {
    navigate('/crear-empleado'); // Navega al componente de creación de empleado
  };

  const handleEliminarEmpleado = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este empleado? Esta acción no se puede deshacer.');

    if (confirmar) {
      try {
        const formData = new FormData();
        formData.append('id_usuario', id);

        await axios.delete('https://localhost:7124/api/Empleado/Eliminar', {
          headers: { 
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        });

        alert('Empleado eliminado exitosamente.');
        
        setEmpleados((prevEmpleados) => prevEmpleados.filter((empleado) => empleado.persona.id_usuario !== id));
      } catch (err) {
        console.error('Error al eliminar el empleado:', err);
        setError('Hubo un error al eliminar el empleado');
      }
    }
  };

  const handleVolver = () => {
    navigate('/admin'); // Redirige al componente Admin
  };

  return (
    <div className="gestionar-empleados-container">
      <h1>Gestión de Empleados</h1>

      {/* Botón para crear un nuevo empleado */}
      <button className="crear-empleado-btn" onClick={handleCrearEmpleado}>Crear Empleado</button>
      
      {/* Botón para volver al componente Admin */}
      <button className="volver-btn" onClick={handleVolver}>Volver</button>

      {isLoading && <p>Cargando empleados...</p>}
      {error && <p className="error-message">{error}</p>}

      {empleados.length > 0 ? (
        <table className="empleados-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.persona.id_usuario}>
                <td>{empleado.persona.id_usuario}</td>
                <td>{empleado.persona.nombre}</td>
                <td>{empleado.persona.apellido}</td>
                <td>{empleado.persona.telefono}</td>
                <td>{empleado.persona.direccion}</td>
                <td>
                  <button onClick={() => navigate(`/editar-empleado/${empleado.persona.id_usuario}`)}>Editar</button>
                </td>
                <td>
                  <button onClick={() => handleEliminarEmpleado(empleado.persona.id_usuario)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !isLoading && <p>No se encontraron empleados.</p>
      )}
    </div>
  );
};

export default GestionarEmpleado;

