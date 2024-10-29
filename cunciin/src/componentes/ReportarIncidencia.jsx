import React, { useState, useEffect } from 'react';
import "./ReportarIncidencia.css";

function getCookie(name) {
    const value = document.cookie;
    const parts = value.split('; ');
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].split('=');
        if (part[0] === name) return part[1];
    }
    return null;
}

const ReportarIncidencia = () => {
    const userId = getCookie('userId'); 

    const [formData, setFormData] = useState({
        nombre_incidencia: '',
        descripcion: '',
        imagen: null,
        fecha_inicio: '',
        fecha_fin: '',
        id_estado: '1', 
        id_categoria: '',
        id_ubicacion: '',
        id_usuario: userId, 
    });

    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const today = new Date();
        
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Mes con ceros iniciales
        const day = today.getDate().toString().padStart(2, '0'); // Día con ceros iniciales
    
        const hours = today.getHours().toString().padStart(2, '0'); // Hora con ceros iniciales
        const minutes = today.getMinutes().toString().padStart(2, '0'); // Minutos con ceros iniciales
        const seconds = today.getSeconds().toString().padStart(2, '0'); // Segundos con ceros iniciales
    
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
        setFormData((prevData) => ({
            ...prevData,
            fecha_inicio: formattedDateTime,
        }));
    }, []);
    
    useEffect(() => {
        const today = new Date();
    
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Mes con ceros iniciales
        const day = today.getDate().toString().padStart(2, '0'); // Día con ceros iniciales
    
        // Configura hora, minutos y segundos en '00'
        const hours = '00';
        const minutes = '00';
        const seconds = '00';
    
        const formattedEndDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
        setFormData((prevData) => ({
            ...prevData,
            fecha_fin: formattedEndDateTime,
        }));
    }, []);
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Image = reader.result.split(',')[1]; 
            setFormData((prevData) => ({
                ...prevData,
                imagen: base64Image, 
            }));
        };

        if (file) {
            reader.readAsDataURL(file); 
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.imagen) {
            setMensaje("La imagen es requerida.");
            return;
        }
        const now = new Date();
        const incidenciaData = {
            nombre_incidencia: formData.nombre_incidencia,
            descripcion: formData.descripcion,
            imagen: formData.imagen,
            fecha_inicio: now.toISOString(), 
            fecha_fin: new Date(formData.fecha_fin).toISOString(),       
            id_usuario: parseInt(formData.id_usuario),
            id_estado: parseInt(formData.id_estado),
            id_categoria: parseInt(formData.id_categoria),
            id_ubicacion: parseInt(formData.id_ubicacion),
        };

        try {
            const response = await fetch('https://localhost:7124/api/Incidencia/RegistrarIncidencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(incidenciaData),
            });

            if (response.ok) {
                setMensaje('Incidencia reportada con éxito.');
                setFormData({
                    nombre_incidencia: '',
                    descripcion: '',
                    imagen: null,
                    fecha_inicio: new Date().toISOString().split('T')[0],
                    fecha_fin: new Date().toISOString().split('T')[0],
                    id_estado: '1',
                    id_categoria: '',
                    id_ubicacion: '',
                    id_usuario: userId,
                });
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData); // Log de error
                setMensaje(errorData.errors ? errorData.errors.join(', ') : 'Error al reportar la incidencia.');
            }
        } catch (error) {
            setMensaje('Error al comunicarse con el servidor: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Reportar Incidencia</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <label>Título de la Incidencia:</label>
                <input
                    type="text"
                    name="nombre_incidencia"
                    value={formData.nombre_incidencia}
                    onChange={handleChange}
                    required
                />

                <label>Descripción:</label>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                />

                <label>Ubicación:</label>
                <select
                    name="id_ubicacion"
                    value={formData.id_ubicacion}
                    onChange={handleChange}
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

                <label>Adjuntar Imagen:</label>
                <input
                    type="file"
                    name="imagen"
                    accept="image/*"  // Solo acepta archivos de imagen
                    onChange={handleImageChange}
                    required
                />

                <label>Fecha de Inicio:</label>
                <input
                    type="date"
                    name="fecha_inicio"
                    value={formData.fecha_inicio}
                    onChange={handleChange}
                    readOnly
                />

                <label>Categoría:</label>
                <select
                    name="id_categoria"
                    value={formData.id_categoria}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona la categoría</option>
                    <option value="1">Infraestructura</option>
                    <option value="2">Sanidad</option>
                    <option value="3">Seguridad</option>
                </select>

                <button type="submit">Reportar</button>
            </form>
        </div>
    );
};

export default ReportarIncidencia;

