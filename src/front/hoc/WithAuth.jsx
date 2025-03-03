import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const WithAuth = ({page}) => {
    const [token, setToken] = useState(null);
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(store.token !== null) {
            setToken(store.token);
            navigate(location.pathname);
        }
    }, []);

    return (
        <>
        { token ? page : <Navigate to="/login" replace /> }
        </>
    );
};
