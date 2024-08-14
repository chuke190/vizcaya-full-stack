import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';  // Importar el archivo CSS global
import '@fortawesome/fontawesome-free/css/all.min.css'; 

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
