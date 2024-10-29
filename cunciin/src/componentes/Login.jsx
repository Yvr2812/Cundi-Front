import React, { useState } from 'react'; 
import Imagen1 from '../assets/faca4.jpg';
import Imagen2 from '../assets/profile.jpeg';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


const Login = () => {
  const [registrando, setRegistrando] = useState(false); 

  return (
    <div className='container'>
      <div className="row">
        {/* Columna para el formulario */}
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body shadow-lg">
              <img src={Imagen2} alt="Foto de perfil" className='estilo-profile' />
              
              {/* Alterna entre LoginForm y RegisterForm */}
              {registrando ? <RegisterForm /> : <LoginForm />}
              
              <div className='texto'>
                <h4>
                  {registrando ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
                </h4>
                <button
                  className='btnswitch'
                  onClick={() => setRegistrando(!registrando)}
                  aria-label={registrando ? "Iniciar sesión" : "Registrarse"}
                >
                  {registrando ? "Iniciar sesión" : "Registrarse"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Columna para la imagen */}
        <div className="col-md-8">
          <img src={Imagen1} alt="Vista de Facatativá" className='tamaño-imagen' />
        </div>
      </div>
    </div>
  );
};

export default Login;