import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ActualizarPerfilUsuario.css';
import { useNavigate } from 'react-router-dom';

const programas = {
  1: 'Ingeniería Ambiental',
  2: 'Ingeniería de Sistemas',
  3: 'Ingeniería Agronómica',
  4: 'Contaduría Pública',
  5: 'Psicología',
  6: 'Administración de Empresas',
};

const semestres = {
  1: 'Primer Semestre',
  2: 'Segundo Semestre',
  3: 'Tercer Semestre',
  4: 'Cuarto Semestre',
  5: 'Quinto Semestre',
  6: 'Sexto Semestre',
  7: 'Séptimo Semestre',
  8: 'Octavo Semestre',
  9: 'Noveno Semestre',
  10: 'Décimo Semestre',
};

const ActualizarPerfilUsuario = () => {
  const [usuario, setUsuario] = useState({
    correo: '',
    programa: '',
    semestre: '',
    direccion: '',
    telefono: '',
  });
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const id_usuario = Cookies.get('userId');

    if (id_usuario) {
      const fetchUsuarioData = async () => {
        try {
          const response = await axios.get(`https://localhost:7124/api/Usuario/Traer-Datos-Usuario?id_usuario=${id_usuario}`);
          setUsuario({
            correo: response.data.correo,
            programa: response.data.programa,
            semestre: response.data.semestre,
            direccion: response.data.direccion,
            telefono: response.data.telefono,
          });
        } catch (err) {
          console.error('Error al cargar la información del usuario:', err);
          setError('Error al cargar la información del usuario.');
        }
      };
      fetchUsuarioData();
    } else {
      setError('No se encontró el ID del usuario en las cookies.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefono' && (value === '' || /^[3][0-9]*$/.test(value))) {
      setUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));
    } else if (name !== 'telefono') {
      setUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.correo || !usuario.programa || !usuario.semestre || !usuario.direccion || !usuario.telefono) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const id_usuario = Cookies.get('userId');

      const params = new URLSearchParams();
      params.append('correo', usuario.correo);
      params.append('programa', usuario.programa);
      params.append('semestre', usuario.semestre);
      params.append('direccion', usuario.direccion);
      params.append('telefono', usuario.telefono);

      console.log("Datos enviados:", params.toString());

      await axios.post(`https://localhost:7124/api/Usuario/Actualizar`, params);

      setMensaje('Perfil actualizado exitosamente.');

      // Redirigir a la página de perfil
      navigate('/perfil');
    } catch (err) {
      console.error('Error al actualizar el perfil:', err.response?.data || err);
      setError('Error al actualizar la información del usuario.');
    }
  };

  return (
    <div className="actualizar-perfil-container">
      <h1>Actualizar Perfil de Usuario</h1>
      {error && <p className="error">{error}</p>}
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="form-actualizar-perfil">
        <div className="form-group">
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
            placeholder="Correo"
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={usuario.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            maxLength={10}
            required
          />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={usuario.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            required
          />
        </div>
        <div className="form-group">
          <label>Programa:</label>
          <select
            name="programa"
            value={usuario.programa}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un programa</option>
            {Object.keys(programas).map((key) => (
              <option key={key} value={key}>
                {programas[key]}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Semestre:</label>
          <select
            name="semestre"
            value={usuario.semestre}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un semestre</option>
            {Object.keys(semestres).map((key) => (
              <option key={key} value={key}>
                {semestres[key]}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-actualizar">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ActualizarPerfilUsuario;
