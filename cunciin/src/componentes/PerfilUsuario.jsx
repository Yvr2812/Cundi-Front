import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom'; 
import './PerfilUsuario.css';

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

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null); 
  const [error, setError] = useState(null); 
  const [showModal, setShowModal] = useState(false); // Para controlar la ventana emergente
  const [motivo, setMotivo] = useState(''); // Estado para el motivo de eliminación
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const id_usuario = Cookies.get('userId');
    if (id_usuario) {
      const fetchUsuarioData = async () => {
        try {
          const response = await axios.get(`https://localhost:7124/api/Usuario/Traer-Datos-Usuario?id_usuario=${id_usuario}&timestamp=${new Date().getTime()}`);
          setUsuario(response.data); 
        } catch (err) {
          setError('Error al cargar la información del usuario: ' + (err.response?.data?.message || err.message));
        }
      };
      fetchUsuarioData();
    } else {
      setError('No se encontró el ID del usuario en las cookies.');
    }
  }, []);

  const handleActualizarPerfil = () => {
    navigate('/ActualizarPerfilUsuario');
  };

  const handleEliminarCuenta = async () => {
    const idUsuario = Cookies.get('userId');  
    if (!motivo) {
      setError('La descripción es obligatoria para eliminar la cuenta.');
      return;
    }

    try {
      await axios.delete(`https://localhost:7124/api/Usuario/Eliminar?id_usuario=${idUsuario}&motivo=${motivo}`);
      setMensaje('Cuenta eliminada exitosamente.');
      // Redirige o realiza otra acción, como volver a la página de inicio
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      console.error('Error al eliminar la cuenta:', err.response?.data || err);
      setError('Hubo un error al eliminar la cuenta.');
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!usuario) {
    return <div>Cargando información del usuario...</div>;
  }

  return (
    <div className="perfil-usuario-container">
      <h1>Perfil del Usuario</h1>
      <div className="perfil-usuario-info">
        <p><strong>Nombre:</strong> {usuario.nombres}</p>
        <p><strong>Apellido:</strong> {usuario.apellidos}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Teléfono:</strong> {usuario.telefono}</p>
        <p><strong>Programa:</strong> {programas[usuario.id_programa]}</p>
        <p><strong>Semestre:</strong> {semestres[usuario.id_semestre]}</p>
        <p><strong>Dirección:</strong> {usuario.direccion}</p>
      </div>

      <div className="perfil-usuario-botones">
        <button className="boton-actualizar" onClick={handleActualizarPerfil}>
          Actualizar Perfil
        </button>
        <button className="boton-eliminar" onClick={() => setShowModal(true)}>
          Eliminar Cuenta
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Eliminar Cuenta</h2>
            <p>Por favor, proporciona un motivo para la eliminación:</p>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Motivo de la eliminación"
              required
            ></textarea>
            {error && <p className="error">{error}</p>}
            {mensaje && <p className="mensaje">{mensaje}</p>}
            <button onClick={handleEliminarCuenta}>Confirmar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilUsuario;
