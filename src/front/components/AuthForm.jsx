import React, { useState } from 'react';

const AuthForm = ({ objetivo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 py-5">
            <div className="card p-4 bg-transparent border-light w-25" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 1)', borderRadius: '10px', backdropFilter: 'blur(1.5px)', color: 'aliceblue' }}>
                <h1 className="text-center mb-3">{objetivo === 'registrar' ? 'Registro' : 'Iniciar Sesión'}</h1>
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

export default AuthForm;