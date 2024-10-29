import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function getCookie(name) {
    const value = document.cookie;
    const parts = value.split('; ');
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].split('=');
        if (part[0] === name) return part[1];
    }
    return null;
}

const categorias = {
    1: "Infraestructura",
    2: "Sanidad",
    3: "Seguridad"
};

const ubicaciones = {
    1: "Gradas",
    2: "Cafetería",
    3: "Bloque A",
    4: "Bloque B",
    5: "Bloque Administrativo",
    6: "Baños",
    7: "Áreas Verdes",
    8: "Parqueaderos",
    9: "Canchas"
};

const Empleado = () => {
    const [incidencias, setIncidencias] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIncidencias = async () => {
            const userId = getCookie('userId');

            if (!userId) {
                setError("No se encontró el ID del usuario.");
                return;
            }

            try {
                const response = await axios.get(`https://localhost:7124/api/Empleado/ObtenerIncidenciasAsignadas?id_usuario=${userId}`);
                setIncidencias(response.data);
            } catch (err) {
                console.error("Error al obtener las incidencias:", err);
                if (err.response && err.response.status === 404) {
                    setError("No tienes incidencias asignadas.");
                } else {
                    setError("Error al obtener las incidencias.");
                }
            }
        };

        fetchIncidencias();
    }, []);

    const handleFinalizarClick = (idIncidencia) => {
        navigate(`/finalizar-incidencia/${idIncidencia}`);
    };

    const handleLogout = () => {
        // Eliminar la cookie del ID del usuario
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirigir al login
        navigate('/');
    };

    return (
        <div>
            <h1>Historial de Incidencias Asignadas</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button>
            {error && <p>{error}</p>}
            {incidencias.length > 0 && (
                <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre Incidencia</th>
                            <th>Descripción</th>
                            <th>Imagen</th>
                            <th>Categoría</th>
                            <th>Ubicación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidencias.map((incidencia, index) => (
                            <tr key={incidencia.id_incidencia}>
                                <td>{index + 1}</td> {/* Número en orden */}
                                <td>{incidencia.nombre_incidencia}</td>
                                <td>{incidencia.descripcion}</td>
                                <td>
                                    {incidencia.imagen ? (
                                        <img 
                                            src={`data:image/jpeg;base64,${incidencia.imagen}`} 
                                            alt="Incidencia"
                                            style={{ width: "100px", height: "auto" }} 
                                        />
                                    ) : (
                                        "Sin imagen"
                                    )}
                                </td>
                                <td>{categorias[incidencia.id_categoria] || "No especificado"}</td>
                                <td>{ubicaciones[incidencia.id_ubicacion] || "No especificado"}</td>
                                <td>
                                    <button onClick={() => handleFinalizarClick(incidencia.id_incidencia)}>
                                        Finalizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Empleado;
