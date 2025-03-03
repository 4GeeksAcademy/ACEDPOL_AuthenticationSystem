import React from "react";
import useGlobalReducer from '../hooks/useGlobalReducer';
import '../assets/styles/navbar.css'  // Global styles for your application

export const LogOut = () => {
    const { dispatch, store } = useGlobalReducer();

    const handleSubmit = () => {
        dispatch({
            type: 'LOGOUT_USER'
        });
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <>
            {store.token && 
                <div className="position-fixed bottom-0 start-0 mb-2 ms-2">
                    <span className="me-2">Bienvenido, {store.user}</span>
                </div>
            }
            <div className="position-fixed bottom-0 end-0 mb-2 me-2">
                <button className={`btn btn-toggle btn-no-outline ${store.token ? 'active' : 'disabled'}`} onClick={handleSubmit}>
                    Cerrar Sesión
                </button>
            </div>
        </>
    );
};
