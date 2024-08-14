<?php

require_once '../controller/upload.php';
require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../controller/UserController.php';
require_once '../controller/PacienteController.php';
require_once '../controller/EspecialidadController.php';
require_once '../controller/MedicoController.php';
require_once '../controller/TratamientoController.php';
require_once '../controller/CitasController.php';
require_once '../controller/PagosController.php';


$database = new Database();
$db = $database->dbConnect();

$user = new UserController($db);
$paciente = new PacienteController($db);
$especialidad = new EspecialidadController($db);
$medico = new MedicoController($db);
$tratamiento = new TratamientoController($db);
$cita = new CitasController($db);
$pagos = new PagosController($db);

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    // VVV Upload VVV
    case 'uploadfile':
        uploadFile();
        break;

    // VVV Usuario VVV
    case 'getusers':
        $user->passUsers();
        break;
    case 'adduser':
        $user->addUser();
        break;
    case 'deleteuser':
        $user->deleteUser();
        break;
    case 'updateuser':
        $user->updateUser();
        break;

    // VVV Paciente VVV
    case 'getpacientes':
        $paciente->passPacientes();
        break;
    case 'addpaciente':
        $paciente->addPaciente();
        break;
    case 'deletepaciente':
        $paciente->deletePaciente();
        break;
    case 'updatepaciente':
        $paciente->updatePaciente();
        break;

    // VVV Especialidad VVV
    case 'getespecialidades':
        $especialidad->passEspecialidades();
        break;
    case 'addespecialidad':
        $especialidad->addEspecialidad();
        break;
    case 'deleteespecialidad':
        $especialidad->deleteEspecialidad();
        break;
    case 'dropallesp':
        $especialidad->dropEspecialidades();
        break;
    case 'updateespecialidad':
        $especialidad->updateEspecialidad();
        break;

    // VVV Medicos VVV
    case 'getmedicos':
        $medico->passMedicos();
        break;
    case 'addmedico':
        $medico->addMedico();
        break;
    case 'deletemedico':
        $medico->deleteMedico();
        break;
    case 'updatemedico':
        $medico->updateMedico();
        break;

    // Tratamientos VVV
    case 'gettratamientos':
        $tratamiento->passTratamientos();
        break;
    case 'addtratamiento':
        $tratamiento->addTratamiento();
        break;
    case 'deletetratamiento':
        $tratamiento->deleteTratamiento();
        break;
    case 'updatetratamiento':
        $tratamiento->updateTratamiento();
        break;

    // VVV Citas VVV
    case 'getcitas':
        $cita->passCitas();
        break;
    case 'addcita':
        $cita->addCita();
        break;
    case 'deletecita':
        $cita->deleteCita();
        break;
    case 'updatecita':
        $cita->updateCita();
        break;

    // VVV counters VVV
    case 'countusers':
        $user->count();
        break;
    case 'countpacientes':
        $paciente->count();
        break;
    case 'countcitas':
        $cita->count();
        break;
    case 'countmedicos':
        $medico->count();
        break;

    /// VVV Pagos VVV
    case 'getpagos':
        $pagos->passPagos();
        break;
    case 'addpago':
        $pagos->addPago();
        break;
    case 'deletepago':
        $pagos->deletePago();
        break;

    default:
        echo json_encode(array("message" => "No se encontró la acción"));
        break;
}