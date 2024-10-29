import React, { useState } from 'react';

const RecuperarContrasena = () => {
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [etapa, setEtapa] = useState(1); 
  
  const enviarCodigo = async () => {
    console.log("Correo:", correo); 

    try {
        const formData = new FormData();
        formData.append('correo', correo);

        const response = await fetch('https://localhost:7124/api/RecuperarContrasena/EnviarCodigo', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            alert('Código enviado al correo proporcionado.');
            setEtapa(2); 
        } else {
            const errorData = await response.json();
            console.log("Detalles del error:", errorData); 

            if (errorData.errors && errorData.errors.correo) {
                alert(`Error en el campo correo: ${errorData.errors.correo[0]}`);
            } else {
                alert(`Error: ${errorData.title || 'Solicitud incorrecta'}`);
            }
        }
    } catch (error) {
        console.error('Error al enviar el código:', error);
        alert('Hubo un problema al enviar el código.');
    }
};

const actualizarContrasena = async () => {
  try {
    // Construye la URL con el parámetro de nueva contraseña
    const url = `https://localhost:7124/api/RecuperarContrasena/ActualizarContrasena?nuevaContrasena=${encodeURIComponent(nuevaContrasena)}`;

    // Crea un FormData para enviar el token
    const formData = new FormData();
    formData.append('token', codigo); // 'codigo' debe tener el valor de token

    const respuesta = await fetch(url, {
      method: 'POST',
      body: formData, // Usa FormData para enviar el token
    });

    if (respuesta.ok) {
      alert('Contraseña actualizada correctamente.');
      setEtapa(1); 
    } else {
      const errorData = await respuesta.json();
      console.error("Detalles del error:", errorData);
      alert(errorData.mensaje || 'Error al actualizar la contraseña. Verifica el código e inténtalo de nuevo.');
    }
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    alert('Hubo un problema al actualizar la contraseña.');
  }
};


  return (
    <div>
      {etapa === 1 ? (
        <div>
          <h2>Recuperar Contraseña</h2>
          <label>
            Correo electrónico:
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </label>
          <button onClick={enviarCodigo}>Enviar Código</button>
        </div>
      ) : (
        <div>
          <h2>Actualizar Contraseña</h2>
          <label>
            Código:
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </label>
          <label>
            Nueva Contraseña:
            <input
              type="password"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              required
            />
          </label>
          <button onClick={actualizarContrasena}>Actualizar Contraseña</button>
        </div>
        
      )}
    </div>
  );
};

export default RecuperarContrasena;

