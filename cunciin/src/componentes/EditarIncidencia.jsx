import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditarIncidencia = () => {
  const [incidencia, setIncidencia] = useState({
    nombre_incidencia: '',
    descripcion: '',
    imagen: null,
    id_categoria: '',
    id_ubicacion: ''
  });
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result.split(',')[1];
      setIncidencia((prevData) => ({
        ...prevData,
        imagen: base64Image,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const incidenciaId = localStorage.getItem('id_incidencia'); // Obtener el ID desde el localStorage
  
    // Crear una cadena de consulta (query string)
    const formData = new URLSearchParams();
    formData.append('id_incidencia', incidenciaId);
    formData.append('nombre_incidencia', incidencia.nombre_incidencia);
    formData.append('descripcion', incidencia.descripcion);
    if (incidencia.imagen) formData.append('imagen', incidencia.imagen);
    formData.append('id_categoria', incidencia.id_categoria);
    formData.append('id_ubicacion', incidencia.id_ubicacion);
  
    try {
      const response = await fetch('https://localhost:7124/api/Incidencia/ActualizarInci', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(), // Convierte a string para enviar
      })
  
      if (response.ok) {
        alert('Incidencia actualizada exitosamente');
        navigate('/ver-incidencias'); 
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al actualizar la incidencia.');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error de conexión o en el servidor.');
    }
  };

  return (
    <div className="editar-incidencia-container">
      <h2>Editar Incidencia</h2>
      <form className="editar-incidencia-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="nombre_incidencia">Título:</label>
          <input 
            type="text" 
            id="nombre_incidencia"
            value={incidencia.nombre_incidencia} 
            onChange={(e) => setIncidencia({ ...incidencia, nombre_incidencia: e.target.value })} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            value={incidencia.descripcion} 
            onChange={(e) => setIncidencia({ ...incidencia, descripcion: e.target.value })} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="id_ubicacion">Ubicación:</label>
          <select
            id="id_ubicacion"
            value={incidencia.id_ubicacion}
            onChange={(e) => setIncidencia({ ...incidencia, id_ubicacion: e.target.value })} 
            required
          >
            <option value="">Selecciona la Ubicación</option>
            <option value="1">Gradas</option>
            <option value="2">Cafetería</option>
            <option value="3">Bloque A</option>
            <option value="4">Bloque B</option>
            <option value="5">Bloque Administrativo</option>
            <option value="6">Baños</option>
            <option value="7">Áreas Verdes</option>
            <option value="8">Parqueaderos</option>
            <option value="9">Canchas</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Adjuntar Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"  
            onChange={handleImageChange} // Llama a handleImageChange en lugar de setIncidencia directo
          />
        </div>
        <div className="form-group">
          <label htmlFor="id_categoria">Categoría:</label>
          <select
            id="id_categoria"
            value={incidencia.id_categoria}
            onChange={(e) => setIncidencia({ ...incidencia, id_categoria: e.target.value })} 
            required
          >
            <option value="">Selecciona la categoría</option>
            <option value="1">Infraestructura</option>
            <option value="2">Sanidad</option>
            <option value="3">Seguridad</option>
          </select>
        </div>
        <button type="submit" className="save-button">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditarIncidencia;
