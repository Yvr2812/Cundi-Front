// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './componentes/Login.jsx';
import Home from './componentes/Home.jsx';
import Admin from './componentes/Admin.jsx';
import Empleado from './componentes/Empleado.jsx';
import Estudiante from './componentes/Estudiante.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Navegación directa sin componente Navigation */}
        <nav>
          <ul>
            <li><button onClick={() => useNavigate("/")}>Inicio</button></li>
            <li><button onClick={() => useNavigate("/admin")}>Administrador</button></li>
            <li><button onClick={() => useNavigate("/empleado")}>Empleado</button></li>
            <li><button onClick={() => useNavigate("/estudiante")}>Estudiante</button></li>
            <li><button onClick={() => useNavigate("/cerrar-sesion")}>Cerrar Sesión</button></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/empleado" element={<Empleado />} />
          <Route path="/estudiante" element={<Estudiante />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
