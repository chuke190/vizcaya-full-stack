import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import Nav from '../components/Nav';

const AdminDashboard = ({ pacientes, citas, ingresosArray, medicos, users }) => {
  // Asegúrate de que ingresosArray sea un array válido
  const validIngresosArray = Array.isArray(ingresosArray) ? ingresosArray : [];
  // Calcular el total de ingresos pagados
  const totalIngresos = validIngresosArray.reduce((total, ingreso) => total + (ingreso.monto || 0), 0);

  console.log('Ingresos Array:', validIngresosArray);

  const [pacientesCount, setPacientesCount] = useState(0);
  const [citasCount, setCitasCount] = useState(0);
  const [medicosCount, setMedicosCount] = useState(0);
  const [usuariosCount, setUsuariosCount] = useState(0);

  useEffect(() => {
    const countPacientes = async () => {
      try {
        const response = await fetch('http://localhost/vizcaya-full-stack/backend2/public/index.php?action=countpacientes');
        const data = await response.json();
        setPacientesCount(data["COUNT(*)"]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    countPacientes();
  }, []);

  useEffect(() => {
    const countCitas = async () => {
      try {
        const response = await fetch('http://localhost/vizcaya-full-stack/backend2/public/index.php?action=countcitas');
        const data = await response.json();
        setCitasCount(data["COUNT(*)"]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    countCitas();
  }, []);

  useEffect(() => {
    const countMedicos = async () => {
      try {
        const response = await fetch('http://localhost/vizcaya-full-stack/backend2/public/index.php?action=countmedicos');
        const data = await response.json();
        setMedicosCount(data["COUNT(*)"]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    countMedicos();
  } , []);

  useEffect(() => {
    const countUsuarios = async () => {
      try {
        const response = await fetch('http://localhost/vizcaya-full-stack/backend2/public/index.php?action=countusers');
        const data = await response.json();
        setUsuariosCount(data["COUNT(*)"]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    countUsuarios();
  }, []);


  return (
    <div className="admbody">
      <Nav />
      <div className="admin-dashboard">
        <h1>Dashboard Administrativo</h1>
        <div className="dashboard-summary">
          <div className="summary-card-m">
            <h3>Pacientes</h3>
            <p>{pacientesCount}</p>
            <Link to="/admin/pacientes" state={{ pacientes }}>
              <button className="btn-view-ad">...Ver...</button>
            </Link>
          </div>
          <div className="summary-card-m">
            <h3>Citas</h3>
            <p>{citasCount}</p>
            <Link to="/admin/citas" state={{ citas }}>
              <button className="btn-view-ad">...Ver...</button>
            </Link>
          </div>
          <div className="summary-card-m">
            <h3>Médicos</h3>
            <p>{medicosCount}</p>
            <Link to="/admin/medicos" state={{ medicos }}>
              <button className="btn-view-ad">...Ver...</button>
            </Link>
          </div>
          <div className="summary-card-m">
            <h3>Usuarios</h3>
            <p>{usuariosCount}</p>
            <Link to="/admin/usuarios" state={{ users }}>
              <button className="btn-view-ad">...Ver...</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
