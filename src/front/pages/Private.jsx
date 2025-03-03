import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Private = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//     }
//   }, [navigate]);

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} alt="Rigo Baby" />
      </p>
    </div>
  );
};