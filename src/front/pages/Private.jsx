import React from 'react';
import privateImageUrl from "../assets/img/Star_Wars_Logo.png";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Private = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="text-center mt-5">
      <h1 className="text-shadow">Welcome padawan, {store.user}!!</h1>
      <p className="col-6 mx-auto">
        <strong>May the force be with you</strong>
        <img src={privateImageUrl} alt="Star Wars" style={{height: '50vh'}}/>
      </p>
      <p className="mt-3">
        See the official emblem of the web, you can. Worked correctly, everything has. See you soon, we will!
      </p>
    </div>
  );
};