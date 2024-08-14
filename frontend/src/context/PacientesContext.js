// src/context/PacientesContext.js
import React, { createContext, useState, useContext } from 'react';

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
    const [pacientesData, setPacientesData] = useState([]);

    return (
        <PacientesContext.Provider value={{ pacientesData, setPacientesData }}>
            {children}
        </PacientesContext.Provider>
    );
};

export const usePacientes = () => {
    const context = useContext(PacientesContext);
    if (!context) {
        throw new Error('usePacientes debe estar dentro de un PacientesProvider');
    }
    return context;
};
