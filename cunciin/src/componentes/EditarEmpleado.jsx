import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    id_usuario: '',
    direccion: '',
    telefono: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [telefonoError, setTelefonoError] = useState('');

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const response = await axios.get('https://localhost:7124/api/Empleado/ListaEmpleados');
        const empleadoEncontrado = response.data.find(
          emp => emp.persona.id_usuario.toString() === id
        );

        if (empleadoEncontrado) {
          setFormData({
            id_usuario: empleadoEncontrado.persona.id_usuario,
            direccion: empleadoEncontrado.persona.direccion,
            telefono: empleadoEncontrado.persona.telefono
          });
        } else {
          setError('Empleado no encontrado');
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error al obtener datos del empleado:', err);
        setError('Error al cargar los datos del empleado');
        setIsLoading(false);
      }
    };

    fetchEmpleado();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'telefono') {
      // Solo permitir números
      const numericValue = value.replace(/[^\d]/g, '');
      
      // Validar que empiece con 3 y tenga máximo 10 dígitos
      if (numericValue.length === 0 || numericValue[0] === '3') {
        if (numericValue.length <= 10) {
          setFormData(prevState => ({
            ...prevState,
            [name]: numericValue
          }));
          setTelefonoError('');
        }
      } else {
        setTelefonoError('El número debe comenzar con 3');
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.telefono.length !== 10) {
      setTelefonoError('El número debe tener exactamente 10 dígitos');
      return;
    }

    try {
      const form = new FormData();
      form.append('id_usuario', formData.id_usuario);
      form.append('direccion', formData.direccion);
      form.append('telefono', formData.telefono);

      const response = await axios.post(
        'https://localhost:7124/api/Empleado/Actualizar',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.mensaje === "EMPLEADO ACTUALIZADO EXITOSAMENTE") {
        alert('Empleado actualizado con éxito');
        navigate('/gestionar-empleado');
      } else {
        setError('La actualización no fue exitosa');
      }
    } catch (err) {
      console.error('Error al actualizar empleado:', err);
      const errorMessage = err.response?.data?.mensaje || 'Error al actualizar el empleado';
      setError(errorMessage);
    }
  };

  const handleCancelar = () => {
    navigate('/gestionar-empleado');
  };

  if (isLoading) {
    return <div className="loading-message">Cargando datos del empleado...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button className="btn-cancelar" onClick={handleCancelar}>
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="editar-empleado-container">
      <h1>Editar Empleado</h1>
      <form onSubmit={handleSubmit} className="editar-empleado-form">
        {/* Campo oculto para mantener el id_usuario */}
        <input
          type="hidden"
          name="id_usuario"
          value={formData.id_usuario}
        />

        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            placeholder="Ejemplo: 3001234567"
            required
          />
          {telefonoError && (
            <div className="error-message text-red-500 text-sm mt-1">
              {telefonoError}
            </div>
          )}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-guardar">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="btn-cancelar"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarEmpleado;