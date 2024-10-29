import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AsignarEmpleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id_incidencia } = useParams(); 

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get('https://localhost:7124/api/Empleado/ListaEmpleados');
        console.log('Empleados:', response.data);
        setEmpleados(response.data);
      } catch (err) {
        console.error('Error al obtener los empleados:', err);
        setError('Error al obtener los empleados');
      }
    };

    fetchEmpleados();
  }, []);

  const handleAsignar = async () => {
    if (!selectedEmpleado) {
      alert('Por favor, selecciona un empleado');
      return;
    }
  
    const formData = new FormData();
    formData.append('id_usuario', selectedEmpleado);
    formData.append('id_incidencia', id_incidencia);
  
    try {
      await axios.post('https://localhost:7124/api/Empleado/Asignar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Empleado asignado con éxito');
      navigate('/gestionar-incidencia'); // Regresa a la página de gestionar incidencias
    } catch (err) {
      console.error('Error al asignar el empleado:', err);
      alert('Error al asignar el empleado. Revisa la consola para más detalles.');
    }
  };
  

  return (
    <div>
      <h1>Asignar Empleado</h1>
      {error && <p>{error}</p>}
      <label>Selecciona un empleado:</label>
      <select value={selectedEmpleado} onChange={(e) => setSelectedEmpleado(e.target.value)}>
        <option value="">-- Seleccionar --</option>
        {empleados.length > 0 ? (
          empleados.map((empleado) => (
            <option key={empleado.persona.id_usuario} value={empleado.persona.id_usuario}>
              {empleado.persona.nombre} {empleado.persona.apellido}
            </option>
          ))
        ) : (
          <option>Cargando...</option>
        )}
      </select>
      <button onClick={handleAsignar}>Asignar</button>
    </div>
  );
};

export default AsignarEmpleado;
