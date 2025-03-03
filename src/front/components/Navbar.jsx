import React from "react";
import { Link, useLocation } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import '../assets/styles/navbar.css'  // Global styles for your application

export const Navbar = () => {
    const location = useLocation();
    const { store } = useGlobalReducer();

    return (
        <div className="d-flex justify-content-center mt-2">
            <ul className="nav nav-tabs justify-content-center w-50" id="myTab" role="tablist">
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/" && "active"}`} to="/">Inicio</Link>
                </li> 
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/login" && "active"}`} to="/login">Iniciar Sesión</Link>
                </li> 
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/signup" && "active"}`} to="/signup">Registrar</Link>
                </li> 
                <li className="nav-item">
                    <Link 
                        className={`nav-link ${location.pathname === "/private" && "active"} ${store.token === null && "disabled"}`} 
                        to={store.token !== null ? "/private" : "#"}
                        aria-disabled={store.token !== null ? "false" : "true"}
                    >
                        Zona Privada
                    </Link>
                </li> 
            </ul>
        </div>
    );
};
