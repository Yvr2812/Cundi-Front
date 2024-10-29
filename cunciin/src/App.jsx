import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './componentes/Login.jsx';
import Home from './componentes/Home.jsx';
import Admin from './componentes/Admin.jsx';
import Empleado from './componentes/Empleado.jsx';
import Estudiante from './componentes/Estudiante.jsx';
import PerfilUsuario from './componentes/PerfilUsuario.jsx';
import ActualizarPerfilUsuario from './componentes/ActualizarPerfilUsuario.jsx';
import ReportarIncidencia from './componentes/ReportarIncidencia';
import VerIncidencias from './componentes/VerIncidencias'; 
import EditarIncidencia from './componentes/EditarIncidencia.jsx'; 
import GestionarIncidencia from './componentes/GestionarIncidencia.jsx';
import CrearEmpleado from './componentes/CrearEmpleado';
import GestionarEmpleado from './componentes/GestionarEmpleado.jsx';
import EditarEmpleado from './componentes/EditarEmpleado';
import RecuperarContrasena from './componentes/RecuperarContrasena.jsx';
import FinalizarIncidencia from './componentes/FinalizarIncidencia';
import AsignarEmpleado from './componentes/AsignarEmpleado.jsx';


function App() {
  return (
    <BrowserRouter>
      <div>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/empleado" element={<Empleado />} />
          <Route path="/estudiante" element={<Estudiante />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/ActualizarPerfilUsuario" element={<ActualizarPerfilUsuario />} />
          <Route path="/reportar-incidencia" element={<ReportarIncidencia />} /> 
          <Route path="/ver-incidencias" element={<VerIncidencias />} />
          <Route path="/editar-incidencia/:id_incidencia" element={<EditarIncidencia />} />
          <Route path="/gestionar-incidencia" element={<GestionarIncidencia />} />
          <Route path="/gestionar-empleados" element={<GestionarEmpleado />} />
          <Route path="/crear-empleado" element={<CrearEmpleado />} />
          <Route path="/GestionarEmpleado" element={<GestionarEmpleado />} />
          <Route path="/gestionar-empleado" element={<GestionarEmpleado />} />
          <Route path="/editar-empleado/:id" element={<EditarEmpleado />} />
          <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
          <Route path="/finalizar-incidencia/:id_incidencia" element={<FinalizarIncidencia />} />
          <Route path="/asignar-empleado/:id_incidencia" element={<AsignarEmpleado />} />
          

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
