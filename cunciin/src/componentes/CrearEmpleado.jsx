import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Asegúrate de que esto esté aquí

const CrearEmpleado = () => {
  const navigate = useNavigate(); // Usando useNavigate para la redirección
  const [empleado, setEmpleado] = useState({
    persona: {
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '',
      telefono: '',
      direccion: '',
    },
    id_cargo: 1,
    id_turno: 1,
  });

  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'persona.telefono') {
      if (value.length > 10 || (value.length === 1 && value[0] !== '3')) return;
      if (!/^\d*$/.test(value)) return; 
    }
    if (name.startsWith('persona.')) {
      const personaField = name.split('.')[1];
      setEmpleado({
        ...empleado,
        persona: { ...empleado.persona, [personaField]: value },
      });
    } else {
      setEmpleado({ ...empleado, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar que las contraseñas coincidan
    if (empleado.persona.contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }
  
    setError('');
    const nuevoEmpleado = {
      persona: empleado.persona,
      id_cargo: empleado.id_cargo,
      id_turno: empleado.id_turno,
    };
  
    try {
      await axios.post('https://localhost:7124/api/Empleado/CrearEmpleado', nuevoEmpleado);
      const confirmacion = window.confirm('Empleado creado exitosamente.');
      if (confirmacion) {
        navigate('/GestionarEmpleado'); // Redirige a Gestionar Empleado
      }
      // Reinicia el formulario
      setEmpleado({
        persona: { nombre: '', apellido: '', correo: '', contrasena: '', telefono: '', direccion: '' },
        id_cargo: 1,
        id_turno: 1,
      });
      setConfirmarContrasena('');
    } catch (err) {
      console.error('Error al crear el empleado:', err);
      setError('Hubo un error al crear el empleado');
    }
  };
  

  const handleVolver = () => {
    navigate(-1); 
  };

  return (
    <div className="crear-empleado-container">
      <h2>Crear Nuevo Empleado</h2>
      <form onSubmit={handleSubmit} className="crear-empleado-form">
        <div>
          <label>Nombre</label>
          <input type="text" name="persona.nombre" value={empleado.persona.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Apellido</label>
          <input type="text" name="persona.apellido" value={empleado.persona.apellido} onChange={handleChange} required />
        </div>
        <div>
          <label>Correo</label>
          <input type="email" name="persona.correo" value={empleado.persona.correo} onChange={handleChange} required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" name="persona.contrasena" value={empleado.persona.contrasena} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirmar Contraseña</label>
          <input type="password" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} required />
        </div>
        <div>
          <label>Teléfono</label>
          <input type="text" name="persona.telefono" value={empleado.persona.telefono} onChange={handleChange} required />
        </div>
        <div>
          <label>Dirección</label>
          <input type="text" name="persona.direccion" value={empleado.persona.direccion} onChange={handleChange} required />
        </div>
        <div>
          <label>Cargo</label>
          <select name="id_cargo" value={empleado.id_cargo} onChange={handleChange} required>
            <option value={1}>Celador</option>
            <option value={2}>Servicios Generales</option>
            <option value={3}>Oficios Varios</option>
          </select>
        </div>
        <div>
          <label>Turno</label>
          <select name="id_turno" value={empleado.id_turno} onChange={handleChange} required>
            <option value={1}>6 AM - 6 PM</option>
            <option value={2}>6 PM - 6 AM</option>
            <option value={3}>6 AM - 2 PM</option>
            <option value={4}>2 PM - 10 PM</option>
            <option value={5}>10 PM - 6 AM</option>
            <option value={6}>7 AM - 5 PM</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Guardar Empleado</button>
      </form>
      <div className="editar-empleado-container">
        <h3>Opciones</h3>
      </div>

      <button className="volver-btn" onClick={handleVolver}>Volver</button> 
    </div>
  );
};

export default CrearEmpleado;
