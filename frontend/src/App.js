import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import AgregarUsuario from "./components/AddForms/AgregarUsuario";
import EditUser from "./components/UpdateForms/EditUser";
import Pacientes from "./pages/Pacientes";
import AgregarPaciente from "./components/AddForms/AgregarPaciente";
import EditPac from "./components/UpdateForms/EditPac";
import PacientesView from "./components/Tables/PacientesView";
import Especialidades from "./pages/Especialidades";
import AgregarEspecialidades from "./components/AddForms/AgregarEspecialidades";
import EditarEspecialidad from "./components/UpdateForms/EditarEspecialidad";
import Medicos from "./pages/Medicos";
import AgregarMedicos from "./components/AddForms/AgregarMedicos";
import EditarMedico from "./components/UpdateForms/EditarMedico";
import Tratamientos from "./pages/Tratamientos";
import AgregarTratamientos from "./components/AddForms/AgregarTratamientos";
import EditarTratamiento from "./components/UpdateForms/EditarTratamiento";
import Citas from "./pages/Citas";
import AgregarCitas from "./components/AddForms/AgregarCitas";
import EditarCita from "./components/UpdateForms/EditarCitas";
import CitasView from "./components/Tables/CitasView";
import Odontograma from "./pages/Odontograma";
import HistorialCitas from "./pages/HistorialCitas";
import EditarHistorialCitas from "./components/UpdateForms/EditarHistorialCitas";
import Calendario from "./components/Calendario";
import Pagos from "./pages/Pagos";
import EditarPago from "./components/UpdateForms/EditarPago";
import VerPago from "./components/VerPago";
import CobrarPago from "./components/CobrarPago";
import AgregarPago from "./components/AddForms/AgregarPago";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Reportes from "./pages/Reportes";
import ReportesPaciente from "./components/ReportesPaciente";
import ReportesMedico from "./components/ReportesMedico";
import Radiografias from "./pages/Radio-grafias";
import VerRadiografias from "./components/VerRadiografias";
import ConsentimientoInformado from "./pages/ConsentimientoInformado";
import RecetarioPaciente from "./pages/RecetarioPaciente";
import AdminDashboard from "./pages/AdminDashboard";
import MaintenanceDashboard from "./components/MaintenanceDashboard";
import { PacientesProvider } from "./context/PacientesContext";
import EditAppointmentment from "./components/UpdateForms/EditAppointment";
import MedicosDetalles from "./components/MedicosDetalles";
import UsersView from "./components/Tables/UsersView";
import { AuthContext } from "./context/AuthContext";
import RutaProtegida from "./components/Verificador";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [auth, setAuth] = useState(false);

  const [users, setUsers] = useState([]);
  const [pacientesData, setPacientesData] = useState([]);
  const [especialidadesData, setEspecialidadesData] = useState([]);

  const [tratamientosData, setTratamientosData] = useState([]);

  const [tratamientos, setTratamientos] = useState([]);

  const [citasData, setCitasData] = useState([]);

  const [pagosData, setPagosData] = useState([
    {
      id: 1,
      paciente: "Ana López",
      tratamiento: "Limpieza Dental",
      enfermedad: "Maloclusión",
      fecha: "2023-06-10",
      hora: "10:00",
      costo: "$500",
      pagado: "$500",
      saldo: "$0",
      recibidoPor: "Secretaria",
    },
    {
      id: 2,
      paciente: "Juan Pérez",
      tratamiento: "Empastes Dentales",
      enfermedad: "Caries",
      fecha: "2023-06-12",
      hora: "14:00",
      costo: "$100",
      pagado: "$50",
      saldo: "$50",
      recibidoPor: "Secretaria",
    },
  ]);

  const [medicos, setMedicos] = useState([]);

  const [usuariosData, setUsuariosData] = useState([]);

  // Cargar datos (ejemplo)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("/api/pagos");
        let text = await response.text();
        console.log("Respuesta /api/pagos:", text);
        let data = JSON.parse(text);
        setPagosData(
          data.map((pago) => ({
            ...pago,
            saldo: parseFloat(pago.saldo),
            pagado: parseFloat(pago.pagado),
          }))
        );
      } catch (error) {
        console.error("Error en /api/pagos:", error);
      }

      try {
        let response = await fetch("/api/citas");
        let text = await response.text();
        console.log("Respuesta /api/citas:", text);
        let data = JSON.parse(text);
        setCitasData(data);
      } catch (error) {
        console.error("Error en /api/citas:", error);
      }

      try {
        let response = await fetch("/api/usuarios");
        let text = await response.text();
        console.log("Respuesta /api/usuarios:", text);
        let data = JSON.parse(text);
        setUsuariosData(data);
      } catch (error) {
        console.error("Error en /api/usuarios:", error);
      }
    };

    fetchData();
  }, []);

  const [ingresos, setIngresosData] = useState([]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <PacientesProvider>
          <div className="app">
            <Routes>
              <Route
                path="/"
                element={<Login setLoggedInUser={setLoggedInUser} />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard loggedInUser={loggedInUser} />}
              />

              <Route
                path="/admin"
                element={
                  <AdminDashboard
                    pacientes={pacientesData}
                    citas={citasData}
                    ingresos={ingresos}
                    medicos={medicos}
                    users={users}
                  />
                }
              />
              <Route
                path="/admin/pacientes"
                element={<PacientesView pacientes={pacientesData} />}
              />
              <Route
                path="/admin/citas"
                element={<CitasView citas={citasData} />}
              />
              <Route
                path="/admin/medicos"
                element={<MedicosDetalles />}
                medicos={medicos}
              />
              <Route
                path="/admin/usuarios"
                element={<UsersView />}
                users={users}
              />

              <Route path="/mantenimiento" element={<MaintenanceDashboard />} />
              <Route
                path="/mantenimiento/add-appointment"
                element={
                  <AgregarCitas
                    tratamientos={tratamientos}
                    setCitasData={setCitasData}
                  />
                }
              />
              <Route
                path="/mantenimiento/edit-appointment"
                element={
                  <EditAppointmentment
                    citasData={citasData}
                    setCitasData={setCitasData}
                    tratamientos={tratamientos}
                    pacientesData={pacientesData}
                    medicosData={medicos}
                  />
                }
              />

              <Route
                path="/usuarios"
                element={<Usuarios users={users} setUsers={setUsers} />}
              />
              <Route
                path="/agregar-usuario"
                element={<AgregarUsuario users={users} setUsers={setUsers} />}
              />
              <Route
                path="/editar-usuario/:id"
                element={<EditUser users={users} setUsers={setUsers} />}
              />

              <Route
                path="/pacientes"
                element={
                  <Pacientes
                    pacientesData={pacientesData}
                    setPacientesData={setPacientesData}
                  />
                }
              />
              <Route
                path="/agregar-paciente"
                element={
                  <AgregarPaciente setPacientesData={setPacientesData} />
                }
              />
              <Route
                path="/editar-paciente/:id"
                element={
                  <EditPac
                    pacientesData={pacientesData}
                    setPacientesData={setPacientesData}
                  />
                }
              />

              <Route
                path="/especialidades"
                element={
                  <Especialidades
                    especialidadesData={especialidadesData}
                    setEspecialidadesData={setEspecialidadesData}
                  />
                }
              />
              <Route
                path="/agregar-especialidades"
                element={
                  <AgregarEspecialidades
                    especialidadesData={especialidadesData}
                    setEspecialidadesData={setEspecialidadesData}
                  />
                }
              />
              <Route
                path="/editar-especialidades/:id"
                element={
                  <EditarEspecialidad
                    especialidadesData={especialidadesData}
                    setEspecialidadesData={setEspecialidadesData}
                  />
                }
              />

              <Route
                path="/medicos"
                element={<Medicos medicos={medicos} setMedicos={setMedicos} />}
              />
              <Route
                path="/agregar-medicos"
                element={
                  <AgregarMedicos medicos={medicos} setMedicos={setMedicos} />
                }
              />
              <Route
                path="/editar-medico/:id"
                element={
                  <EditarMedico medicos={medicos} setMedicos={setMedicos} />
                }
              />

              <Route
                path="/tratamientos"
                element={
                  <Tratamientos
                    tratamientosData={tratamientosData}
                    setTratamientosData={setTratamientosData}
                  />
                }
              />
              <Route
                path="/agregar-tratamientos"
                element={
                  <AgregarTratamientos
                    tratamientosData={tratamientosData}
                    setTratamientosData={setTratamientosData}
                  />
                }
              />
              <Route
                path="/editar-tratamiento/:id"
                element={
                  <EditarTratamiento
                    tratamientosData={tratamientosData}
                    setTratamientosData={setTratamientosData}
                  />
                }
              />

              <Route
                path="/citas"
                element={
                  <Citas citasData={citasData} setCitasData={setCitasData} />
                }
              />
              <Route
                path="/agregar-citas"
                element={<AgregarCitas setCitasData={setCitasData} />}
              />
              <Route
                path="/editar-cita/:id"
                element={
                  <EditarCita
                    citasData={citasData}
                    setCitasData={setCitasData}
                  />
                }
              />

              <Route path="/odontograma" element={<Odontograma />} />

              <Route
                path="/historial-citas"
                element={
                  <HistorialCitas
                    citasData={citasData}
                    setCitasData={setCitasData}
                  />
                }
              />
              <Route
                path="/editar-historial-citas/:id"
                element={
                  <EditarHistorialCitas
                    citasData={citasData}
                    setCitasData={setCitasData}
                  />
                }
              />

              <Route path="/calendario" element={<Calendario />} />

              <Route
                path="/pagos"
                element={
                  <Pagos
                    pagosData={pagosData}
                    citasData={citasData}
                    setPagosData={setPagosData}
                    usuariosData={usuariosData}
                  />
                }
              />
              <Route
                path="/ver-pago/:id"
                element={
                  <VerPago
                    pagosData={pagosData}
                    citasData={citasData}
                    usuariosData={usuariosData}
                    setPagosData={setPagosData}
                    setIngresosData={setIngresosData}
                  />
                }
              />
              <Route
                path="/cobrar-pago/:id"
                element={
                  <CobrarPago
                    pagosData={pagosData}
                    setPagosData={setPagosData}
                  />
                }
              />
              <Route
                path="/editar-pago/:id"
                element={
                  <EditarPago
                    pagosData={pagosData}
                    setPagosData={setPagosData}
                  />
                }
              />
              <Route
                path="/agregar-pago"
                element={<AgregarPago setPagosData={setPagosData} />}
              />

              <Route path="/reportes" element={<Reportes />} />

              <Route path="/reportes-paciente" element={<ReportesPaciente />} />
              <Route path="/reportes-medico" element={<ReportesMedico />} />

              <Route path="/radiografias" element={<Radiografias />} />
              <Route
                path="/ver-radiografias/:patientId"
                element={<VerRadiografias />}
              />
              <Route
                path="/consentimientoinformado"
                element={<ConsentimientoInformado />}
              />

              <Route
                path="/recetario-paciente"
                element={
                  <RecetarioPaciente
                    medicos={medicos}
                    setMedicos={setMedicos}
                  />
                }
              />
            </Routes>
          </div>
        </PacientesProvider>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
