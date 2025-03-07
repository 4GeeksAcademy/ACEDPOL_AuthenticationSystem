import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { registerUser, loginUser, clearMessage } from '../actions/userActions';

export const AuthForm = ({ objetivo }) => {
  const { dispatch, store } = useGlobalReducer();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Limpia el mensaje cuando el componente se desmonte
    dispatch(clearMessage());
    setEmail('');
    setPassword('');
  }, [location.pathname]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { email, password }; // Simulación de usuario
    if (objetivo === 'registrar') {
      console.log('Registrando usuario...', user);
      await registerUser(user, dispatch, navigate);
    } else if (objetivo === 'iniciar sesión') {
      console.log('Iniciando sesión...', email);
      await loginUser(email, password, dispatch, navigate);
    }
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 py-5">
      <div className="card p-4 bg-transparent border-light w-25" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 1)', borderRadius: '10px', backdropFilter: 'blur(1.5px)', color: 'aliceblue' }}>
        <h1 className="text-center mb-3">{objetivo === 'registrar' ? 'Registro' : 'Iniciar Sesión'}</h1>
        {store.message && <div className="alert alert-info">{store.message}</div>}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">{objetivo === 'registrar' ? 'Registrar' : 'Iniciar Sesión'}</button>
        </form>
      </div>
    </div>
  );
};
