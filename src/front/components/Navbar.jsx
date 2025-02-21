import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../assets/styles/navbar.css'  // Global styles for your application

export const Navbar = () => {
    const location = useLocation();

    return (
        <div className="d-flex justify-content-center mt-2">
            <ul className="nav nav-tabs justify-content-center w-50" id="myTab" role="tablist">
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/" && "active"}`} to="/">Inicio</Link>
                </li> 
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/signup" && "active"}`} to="/signup">Sign Up</Link>
                </li> 
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/login" && "active"}`} to="/login">Login</Link>
                </li> 
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/private" && "active"}`} to="/private">Private</Link>
                </li> 
            </ul>
        </div>
    );
};
