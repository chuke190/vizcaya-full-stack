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
  const [auth, setAuth] = useState(!!localStorage.getItem("usuarioLogged"));
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuarioLogged');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      setAuth(true);
    }
  }, []);

  const [users, setUsers] = useState([]);
  const [pacientesData, setPacientesData] = useState([]);
  const [especialidadesData, setEspecialidadesData] = useState([]);

  const [tratamientosData, setTratamientosData] = useState([]);

  const [tratamientos, setTratamientos] = useState([]);

  const [citasData, setCitasData] = useState([]);

  const [pagosData, setPagosData] = useState([
    
  ]);

  const [medicos, setMedicos] = useState([]);

  const [usuariosData, setUsuariosData] = useState([]);

  const [ingresos, setIngresosData] = useState([]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <PacientesProvider>
          <div className="app">
            <Routes>
              <Route
                path="/"
                element={
                  <Login setLoggedInUser={setLoggedInUser} />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RutaProtegida>
                    <Dashboard loggedInUser={loggedInUser} />
                  </RutaProtegida>
                }
              />

              <Route
                path="/admin"
                element={
                  <RutaProtegida>
                    <AdminDashboard
                      pacientes={pacientesData}
                      citas={citasData}
                      ingresos={ingresos}
                      medicos={medicos}
                      users={users}
                    />
                  </RutaProtegida>
                }
              />
              <Route
                path="/admin/pacientes"
                element={
                  <RutaProtegida>
                    <PacientesView pacientes={pacientesData} />
                  </RutaProtegida>}
              />
              <Route
                path="/admin/citas"
                element={<RutaProtegida>
                  <CitasView citas={citasData} />
                </RutaProtegida>}
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
                element={
                  <RutaProtegida>
                    <Usuarios users={users} setUsers={setUsers} />
                  </RutaProtegida>}
              />
              <Route
                path="/agregar-usuario"
                element={<RutaProtegida>
                  <AgregarUsuario users={users} setUsers={setUsers} />
                </RutaProtegida>}
              />
              <Route
                path="/editar-usuario/:id"
                element={<RutaProtegida>
                  <EditUser users={users} setUsers={setUsers} />
                </RutaProtegida>}
              />

              <Route
                path="/pacientes"
                element={<RutaProtegida>
                  <Pacientes
                    pacientesData={pacientesData}
                    setPacientesData={setPacientesData}
                  />
                </RutaProtegida>
                }
              />
              <Route
                path="/agregar-paciente"
                element={<RutaProtegida>
                  <AgregarPaciente setPacientesData={setPacientesData} />
                </RutaProtegida>}
              />
              <Route
                path="/editar-paciente/:id"
                element={<RutaProtegida>
                  <EditPac
                    pacientesData={pacientesData}
                    setPacientesData={setPacientesData}
                  />
                </RutaProtegida>
                }
              />

              <Route
                path="/especialidades"
                element={<RutaProtegida>
                  <Especialidades
                    especialidadesData={especialidadesData}
                    setEspecialidadesData={setEspecialidadesData}
                  />
                </RutaProtegida>}
              />
              <Route
                path="/agregar-especialidades"
                element={<RutaProtegida>
                  <AgregarEspecialidades
                    especialidadesData={especialidadesData}
                    setEspecialidadesData={setEspecialidadesData}
                  />
                </RutaProtegida>}
              />
              <Route
                path="/editar-especialidades/:id"
                element={<RutaProtegida>
                  <EditarEspecialidad
                    especialidadesData={especialidadesData}
                    setEspecialidadesData={setEspecialidadesData}
                  />
                </RutaProtegida>}
              />

              <Route
                path="/medicos"
                element={<RutaProtegida><Medicos medicos={medicos} setMedicos={setMedicos} /></RutaProtegida>}
              />
              <Route
                path="/agregar-medicos"
                element={<RutaProtegida>
                  <AgregarMedicos medicos={medicos} setMedicos={setMedicos} />
                </RutaProtegida>
                }
              />
              <Route
                path="/editar-medico/:id"
                element={<RutaProtegida>
                  <EditarMedico medicos={medicos} setMedicos={setMedicos} /></RutaProtegida>
                }
              />

              <Route
                path="/tratamientos"
                element={<RutaProtegida>
                  <Tratamientos
                    tratamientosData={tratamientosData}
                    setTratamientosData={setTratamientosData}
                  /></RutaProtegida>
                }
              />
              <Route
                path="/agregar-tratamientos"
                element={<RutaProtegida>
                  <AgregarTratamientos
                    tratamientosData={tratamientosData}
                    setTratamientosData={setTratamientosData}
                  /></RutaProtegida>
                }
              />
              <Route
                path="/editar-tratamiento/:id"
                element={<RutaProtegida>
                  <EditarTratamiento
                    tratamientosData={tratamientosData}
                    setTratamientosData={setTratamientosData}
                  /></RutaProtegida>
                }
              />

              <Route
                path="/citas"
                element={<RutaProtegida>
                  <Citas citasData={citasData} setCitasData={setCitasData} />
                </RutaProtegida>}
              />
              <Route
                path="/agregar-citas"
                element={<RutaProtegida><AgregarCitas setCitasData={setCitasData} loggedInUser={loggedInUser} /></RutaProtegida>}
              />
              <Route
                path="/editar-cita/:id"
                element={<RutaProtegida>
                  <EditarCita
                    citasData={citasData}
                    setCitasData={setCitasData}
                  /></RutaProtegida>
                }
              />

              <Route path="/odontograma" element={<RutaProtegida><Odontograma /></RutaProtegida>} />

              <Route
                path="/historial-citas"
                element={<RutaProtegida>
                  <HistorialCitas
                    citasData={citasData}
                    setCitasData={setCitasData}
                  /></RutaProtegida>
                }
              />
              <Route
                path="/editar-historial-citas/:id"
                element={<RutaProtegida>
                  <EditarHistorialCitas
                    citasData={citasData}
                    setCitasData={setCitasData}
                  /></RutaProtegida>
                }
              />

              <Route path="/calendario" element={<RutaProtegida><Calendario /></RutaProtegida>} />

              <Route
                path="/pagos"
                element={<RutaProtegida>
                  <Pagos
                    pagosData={pagosData}
                    citasData={citasData}
                    setPagosData={setPagosData}
                    usuariosData={usuariosData}
                    loggedInUser={loggedInUser}
                  /></RutaProtegida>
                }
              />
              <Route
                path="/ver-pago/:id"
                element={<RutaProtegida>
                  <VerPago
                    pagosData={pagosData}
                    citasData={citasData}
                    usuariosData={usuariosData}
                    setPagosData={setPagosData}
                    setIngresosData={setIngresosData}
                  /></RutaProtegida>
                }
              />
              <Route
                path="/cobrar-pago/:id"
                element={<RutaProtegida>
                  <CobrarPago
                    pagosData={pagosData}
                    setPagosData={setPagosData}
                  /></RutaProtegida>
                }
              />
              <Route
                path="/editar-pago/:id"
                element={<RutaProtegida>
                  <EditarPago
                    pagosData={pagosData}
                    setPagosData={setPagosData}
                  /></RutaProtegida>
                }
              />
              <Route
                path="/agregar-pago"
                element={<RutaProtegida><AgregarPago setPagosData={setPagosData} /></RutaProtegida>}
              />

              <Route path="/reportes" element={<RutaProtegida><Reportes /></RutaProtegida>} />

              <Route path="/reportes-paciente" element={<RutaProtegida><ReportesPaciente /></RutaProtegida>} />
              <Route path="/reportes-medico" element={<RutaProtegida><ReportesMedico /></RutaProtegida>} />

              <Route path="/radiografias" element={<RutaProtegida><Radiografias /></RutaProtegida>} />
              <Route
                path="/ver-radiografias/:patientId"
                element={<RutaProtegida><VerRadiografias /></RutaProtegida>}
              />
              <Route
                path="/consentimientoinformado"
                element={<RutaProtegida><ConsentimientoInformado /></RutaProtegida>}
              />

              <Route
                path="/recetario-paciente"
                element={<RutaProtegida>
                  <RecetarioPaciente
                    medicos={medicos}
                    setMedicos={setMedicos}
                  /></RutaProtegida>
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
