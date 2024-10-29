import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FinalizarIncidencia.css'; // Importa el archivo de estilos

const FinalizarIncidencia = () => {
    const { id_incidencia } = useParams(); // Obtener el ID de la incidencia
    const navigate = useNavigate(); // Hook para la navegación
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null); // Cambiar a null para almacenar el archivo
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Obtener el primer archivo
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagen(reader.result); // Almacenar la imagen en base64
            };
            reader.readAsDataURL(file); // Leer el archivo como URL de datos
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!descripcion || !imagen) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }

        // Convertir id_incidencia a un número entero
        const incidenciaId = parseInt(id_incidencia, 10);

        // Crear un objeto FormData
        const formData = new FormData();
        formData.append('id_incidencia', incidenciaId);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagen); // Agregar la imagen en formato base64

        try {
            const response = await axios.post('https://localhost:7124/api/Empleado/ActualizarInci', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Incidencia finalizada exitosamente'); // Alerta de éxito
            console.log(response.data.mensaje); // Para ver el mensaje en la consola si es necesario
            
            // Redirigir al componente Empleado
            navigate('/empleado'); // Redirección
        } catch (error) {
            console.error('Error al actualizar la incidencia:', error.response.data);
            alert('Error al actualizar la incidencia: ' + error.response.data.mensaje); // Alerta de error
        }
    };

    const handleImageClick = () => {
        setIsModalOpen(true); // Abre el modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
    };

    return (
        <div>
            <h1>Finalizar Incidencia</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                        type="file" // Cambiado a tipo file
                        accept="image/*" // Solo permite imágenes
                        onChange={handleImageChange} // Maneja el cambio de imagen
                        required // Campo obligatorio
                    />
                </div>
                {imagen && (
                    <div>
                        <img 
                            src={imagen} 
                            alt="Vista previa" 
                            onClick={handleImageClick} 
                            style={{ cursor: 'pointer', width: '100px', height: 'auto' }} // Estilo para imagen
                        />
                    </div>
                )}
                <button type="submit">Actualizar Incidencia</button>
            </form>

            {/* Modal para mostrar la imagen ampliada */}
            {isModalOpen && (
                <div className="modal" onClick={closeModal}> {/* Cierra el modal al hacer clic en el fondo */}
                    <div className="modal-content" onClick={e => e.stopPropagation()}> {/* Detiene la propagación del evento */}
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={imagen} alt="Imagen ampliada" style={{ width: '100%', height: 'auto' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinalizarIncidencia;

