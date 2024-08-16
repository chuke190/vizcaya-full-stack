import { useNavigate } from 'react-router-dom'; 
import React from 'react';
import NavBarInicio from '../components/NavBarInicio';
import Card from '../components/Card';
import '../styles/Dashboard.css';

const Dashboard = ({ loggedInUser }) => {
    const navigate = useNavigate();

    console.log('loggedInUser:', loggedInUser);

    const adminCards = [
        { icon: <i className="fas fa-users"></i>, title: "Usuarios", link: "/Usuarios" },
        { icon: <i className="fas fa-user"></i>, title: "Pacientes", link: "/Pacientes" },
        { icon: <i className="fas fa-briefcase-medical"></i>, title: "Especialidades", link: "/Especialidades" },
        { icon: <i className="fas fa-user-md"></i>, title: "Medicos", link: "/Medicos" },
        { icon: <i className="fas fa-procedures"></i>, title: "Tratamientos", link: "/Tratamientos" },
        { icon: <i className="fas fa-calendar-alt"></i>, title: "Citas", link: "/Citas" },
        { icon: <i className="fas fa-tooth"></i>, title: "Odontograma", link: "/Odontograma" },
        { icon: <i className="fas fa-history"></i>, title: "Historial Citas", link: "/Historial-Citas" },
        { icon: <i className="fas fa-calendar"></i>, title: "Calendario", link: "/Calendario" },
        { icon: <i className="fas fa-money-check-alt"></i>, title: "Pagos", link: "/Pagos" },
        { icon: <i className="fas fa-chart-line"></i>, title: "Reportes", link: "/Reportes" },
        { icon: <i className="fas fa-x-ray"></i>, title: "Radiografias", link: "/Radiografias" },
        { icon: <i className="fas fa-file-signature"></i>, title: "Consentimiento Informado", link: "/ConsentimientoInformado" },
        { icon: <i className="fas fa-prescription"></i>, title: "Recetario-Paciente", link: "/Recetario-Paciente" },
    ];

    const secretariaCards = [
        { icon: <i className="fas fa-user"></i>, title: "Pacientes", link: "/Pacientes" },
        { icon: <i className="fas fa-calendar-alt"></i>, title: "Citas", link: "/Citas" },
        { icon: <i className="fas fa-history"></i>, title: "Historial Citas", link: "/Historial-Citas" },
        { icon: <i className="fas fa-calendar"></i>, title: "Calendario", link: "/Calendario" },
        { icon: <i className="fas fa-money-check-alt"></i>, title: "Pagos", link: "/Pagos" },
        { },{ },
        { icon: <i className="fas fa-chart-line"></i>, title: "Reportes", link: "/Reportes" },
        { },{ },
    ];

    const medicoCards = [
        { icon: <i className="fas fa-prescription"></i>, title: "Recetario-Paciente", link: "/Recetario-Paciente" },
        { icon: <i className="fas fa-file-signature"></i>, title: "Consentimiento Informado", link: "/ConsentimientoInformado" },
        { icon: <i className="fas fa-x-ray"></i>, title: "Radiografias", link: "/Radiografias" },
        { icon: <i className="fas fa-chart-line"></i>, title: "Reportes", link: "/Reportes" },
        { icon: <i className="fas fa-calendar"></i>, title: "Calendario", link: "/Calendario" },
        { },
        { icon: <i className="fas fa-history"></i>, title: "Historial Citas", link: "/Historial-Citas" },
        { icon: <i className="fas fa-tooth"></i>, title: "Odontograma", link: "/Odontograma" },
        { icon: <i className="fas fa-calendar-alt"></i>, title: "Citas", link: "/Citas" },
        
        
    ];

    let cardsData = [];

    if (loggedInUser?.rol === 'Administrador') {
        cardsData = adminCards;
    } else if (loggedInUser?.rol === 'Secretaria') {
        cardsData = secretariaCards;
    } else if (loggedInUser?.rol === 'Médico') {
        cardsData = medicoCards;
    }

    return (
        <div className="dashboard-container">
            <NavBarInicio />
            <div className="cards-grid">
                {cardsData.map((card, index) => (
                    <Card
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        link={card.link}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
