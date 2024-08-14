<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/Paciente.php';

class PacienteController
{
    private $conn;
    private $paciente;

    //Constructor
    public function __construct($db)
    {
        $this->conn = $db;
        $this->paciente = new Paciente($db);
    }

    //Funcion para obtener todos los pacientes
    public function passPacientes()
    {
        $query = "SELECT * FROM paciente";
        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    //Funcion para agregar un paciente
    public function addPaciente()
    {
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO paciente (tipoDocumento, docIdentidad, nombre, email, telefono, motivoConsulta, diagnostico, observaciones,
        bajoTratamientoMedico, propensoHemorragias, hipertenso, diabetico, embarazada, referidoPor, encargado) VALUES (:tipoDocumento, :docIdentidad,
        :nombre, :email, :telefono, :motivoConsulta, :diagnostico, :observaciones, :bajoTratamientoMedico, :propensoHemorragias, :hipertenso,
        :diabetico, :embarazada, :referidoPor, :encargado)";

        $this->paciente->tipoDocumento = $data->tipoDocumento;
        $this->paciente->docIdentidad = $data->docIdentidad;
        $this->paciente->nombre = $data->nombre;
        $this->paciente->email = $data->email;
        $this->paciente->telefono = $data->telefono;
        $this->paciente->motivoConsulta = $data->motivoConsulta;
        $this->paciente->diagnostico = $data->diagnostico;
        $this->paciente->observaciones = $data->observaciones;
        $this->paciente->bajoTratamientoMedico = $data->bajoTratamientoMedico;
        $this->paciente->propensoHemorragias = $data->propensoHemorragias;
        $this->paciente->hipertenso = $data->hipertenso;
        $this->paciente->diabetico = $data->diabetico;
        $this->paciente->embarazada = $data->embarazada;
        $this->paciente->referidoPor = $data->referidoPor;
        $this->paciente->encargado = $data->encargado;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':tipoDocumento', $this->paciente->tipoDocumento);
        $stmt->bindParam(':docIdentidad', $this->paciente->docIdentidad);
        $stmt->bindParam(':nombre', $this->paciente->nombre);
        $stmt->bindParam(':email', $this->paciente->email);
        $stmt->bindParam(':telefono', $this->paciente->telefono);
        $stmt->bindParam(':motivoConsulta', $this->paciente->motivoConsulta);
        $stmt->bindParam(':diagnostico', $this->paciente->diagnostico);
        $stmt->bindParam(':observaciones', $this->paciente->observaciones);
        $stmt->bindParam(':bajoTratamientoMedico', $this->paciente->bajoTratamientoMedico);
        $stmt->bindParam(':propensoHemorragias', $this->paciente->propensoHemorragias);
        $stmt->bindParam(':hipertenso', $this->paciente->hipertenso);
        $stmt->bindParam(':diabetico', $this->paciente->diabetico);
        $stmt->bindParam(':embarazada', $this->paciente->embarazada);
        $stmt->bindParam(':referidoPor', $this->paciente->referidoPor);
        $stmt->bindParam(':encargado', $this->paciente->encargado);


        try {
            if ($stmt->execute()) {
                echo json_encode(array("message" => "exito"));
            }
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }


    }

    //Funcion para borrar un paciente
    public function deletePaciente()
    {
        $data = json_decode(file_get_contents("php://input"));
        $query = "DELETE FROM paciente WHERE id = :id";

        $this->paciente->id = $data->id;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->paciente->id);

        try {
            if ($stmt->execute()) {
                echo json_encode(array("message" => "exito"));
            }
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    //Funcion para actualizar un paciente
    public function updatePaciente()
    {
        $data = json_decode(file_get_contents("php://input"));
        $query = "UPDATE paciente SET tipoDocumento = :tipoDocumento, docIdentidad = :docIdentidad, nombre = :nombre, email = :email,
        telefono = :telefono, motivoConsulta = :motivoConsulta, diagnostico = :diagnostico, observaciones = :observaciones,
        bajoTratamientoMedico = :bajoTratamientoMedico, propensoHemorragias = :propensoHemorragias, hipertenso = :hipertenso,
        diabetico = :diabetico, embarazada = :embarazada, referidoPor = :referidoPor, encargado = :encargado WHERE id = :id";

        $this->paciente->id = $data->id;
        $this->paciente->nombre = $data->nombre;
        $this->paciente->email = $data->email;
        $this->paciente->telefono = $data->telefono;
        $this->paciente->tipoDocumento = $data->tipoDocumento;
        $this->paciente->docIdentidad = $data->docIdentidad;
        $this->paciente->motivoConsulta = $data->motivoConsulta;
        $this->paciente->diagnostico = $data->diagnostico;
        $this->paciente->observaciones = $data->observaciones;
        $this->paciente->referidoPor = $data->referidoPor;
        $this->paciente->encargado = $data->encargado;
        $this->paciente->bajoTratamientoMedico = $data->bajoTratamientoMedico;
        $this->paciente->propensoHemorragias = $data->propensoHemorragias;
        $this->paciente->hipertenso = $data->hipertenso;
        $this->paciente->diabetico = $data->diabetico;
        $this->paciente->embarazada = $data->embarazada;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->paciente->id);
        $stmt->bindParam(':tipoDocumento', $this->paciente->tipoDocumento);
        $stmt->bindParam(':docIdentidad', $this->paciente->docIdentidad);
        $stmt->bindParam(':nombre', $this->paciente->nombre);
        $stmt->bindParam(':email', $this->paciente->email);
        $stmt->bindParam(':telefono', $this->paciente->telefono);
        $stmt->bindParam(':motivoConsulta', $this->paciente->motivoConsulta);
        $stmt->bindParam(':diagnostico', $this->paciente->diagnostico);
        $stmt->bindParam(':observaciones', $this->paciente->observaciones);
        $stmt->bindParam(':bajoTratamientoMedico', $this->paciente->bajoTratamientoMedico);
        $stmt->bindParam(':propensoHemorragias', $this->paciente->propensoHemorragias);
        $stmt->bindParam(':hipertenso', $this->paciente->hipertenso);
        $stmt->bindParam(':diabetico', $this->paciente->diabetico);
        $stmt->bindParam(':embarazada', $this->paciente->embarazada);
        $stmt->bindParam(':referidoPor', $this->paciente->referidoPor);
        $stmt->bindParam(':encargado', $this->paciente->encargado);

        try {
            if ($stmt->execute()) {
                echo json_encode(array("message" => "exito"));
            }
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function count()
    {
        $query = "SELECT COUNT(*) FROM paciente";
        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }
}