import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    id_rol: 1,
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
    id_programa: '',
    id_semestre: '',
    direccion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'correo') {
      const emailValue = value.replace(/@/g, '');
      setFormData({
        ...formData,
        [name]: emailValue,
      });
    } else if (name === 'telefono') {
      const phoneValue = value.replace(/\D/g, '');
      if (phoneValue.length <= 10) {
        setFormData({
          ...formData,
          [name]: phoneValue,
        });
      }
    } else if (name === 'id_semestre') {
      const semestreValue = parseInt(value, 10);
      if (semestreValue >= 1 && semestreValue <= 10) {
        setFormData({
          ...formData,
          [name]: semestreValue,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Construimos el email completo con el dominio
    const fullEmail = `${formData.correo}@ucundinamarca.edu.co`;

    // Agrupamos los datos en el objeto esperado por el servidor
    const registrationData = {
      persona: {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: fullEmail,
        telefono: formData.telefono,
        direccion: formData.direccion,
        contrasena: formData.contrasena,
        id_rol: formData.id_rol,
      },
      
      id_programa: formData.id_programa,
      id_semestre: formData.id_semestre,
      
    };

    console.log('Datos enviados:', registrationData); // Para verificar datos en la consola

    try {
      const response = await fetch('https://localhost:7124/api/Usuario/Registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicamos que enviamos datos JSON
        },
        body: JSON.stringify(registrationData), // Convertimos los datos a JSON
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registro exitoso');
      } else {
        alert(`Error en el registro: ${data.title}`);
      }
    } catch (error) {
      alert('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-register">
      <h4>Registro de Usuario</h4>

      <input
        type="text"
        name="nombre"
        className="controls"
        placeholder="Nombre"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="apellido"
        className="controls"
        placeholder="Apellido"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="correo"
        className="controls"
        placeholder="Correo Institucional"
        value={formData.correo}
        required
        onChange={handleChange}
      />
      <small>@ucundinamarca.edu.co</small>
      <input
        type="password"
        name="contrasena"
        className="controls"
        placeholder="Contraseña"
        required
        onChange={handleChange}
      />
      <input
        type="tel"
        name="telefono"
        className="controls"
        placeholder="Teléfono"
        value={formData.telefono}
        required
        onChange={handleChange}
      />
      <select name="id_programa" className="controls" required onChange={handleChange}>
        <option value="">Seleccionar Programa</option>
        <option value="1">Ingeniería Ambiental</option>
        <option value="2">Ingeniería de Sistemas</option>
        <option value="3">Ingeniería Agronómica</option>
        <option value="4">Contaduría Pública</option>
        <option value="5">Psicología</option>
        <option value="6">Administración de Empresas</option>
      </select>
      <input
        type="number"
        name="id_semestre"
        className="controls"
        placeholder="Semestre"
        value={formData.semestre}
        min="1"
        max="10"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="direccion"
        className="controls"
        placeholder="Dirección"
        required
        onChange={handleChange}
      />
      <button type="submit" className="botons">Registrarse</button>
    </form>
  );
};

export default RegisterForm;
