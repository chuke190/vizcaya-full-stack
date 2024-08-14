<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/Medico.php';

class MedicoController
{
    private $conn;
    private $medico;

    public function __construct($db)
    {
        $this->conn = $db;
        $this->medico = new Medico($db);
    }

    //Función que devuelve todos los médicos
    public function passMedicos()
    {
        $query = "SELECT m.*, e.nombre as especialidad_nombre 
                  FROM medico m 
                  JOIN especialidad e ON m.especialidad_id = e.id";
        $stmt = $this->conn->prepare($query);
        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    //Función que añade un médico
    public function addMedico()
    {
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO medico (nombre, apellido, dni, direccion, telefono, email, especialidad_id)
                  VALUES (:nombre, :apellido, :dni, :direccion, :telefono, :email, :especialidad_id)";

        $this->medico->nombre = $data->nombre;
        $this->medico->apellido = $data->apellido;
        $this->medico->dni = $data->dni;
        $this->medico->direccion = $data->direccion;
        $this->medico->telefono = $data->telefono;
        $this->medico->email = $data->email;
        $this->medico->especialidad_id = $data->especialidad_id;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':nombre', $this->medico->nombre);
        $stmt->bindParam(':apellido', $this->medico->apellido);
        $stmt->bindParam(':dni', $this->medico->dni);
        $stmt->bindParam(':direccion', $this->medico->direccion);
        $stmt->bindParam(':telefono', $this->medico->telefono);
        $stmt->bindParam(':email', $this->medico->email);
        $stmt->bindParam(':especialidad_id', $this->medico->especialidad_id);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo" . $e->getMessage()));
        }
    }

    public function deleteMedico()
    {
        $data = json_decode(file_get_contents("php://input"));
        $query = "DELETE FROM medico WHERE id = :id";

        $this->medico->id = $data->id;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->medico->id);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function updateMedico()
    {
        $data = json_decode(file_get_contents("php://input"));
        $query = "UPDATE medico SET nombre = :nombre, apellido = :apellido, dni = :dni, direccion = :direccion, telefono = :telefono, email = :email, especialidad_id = :especialidad_id WHERE id = :id";

        $this->medico->id = $data->id;
        $this->medico->nombre = $data->nombre;
        $this->medico->apellido = $data->apellido;
        $this->medico->dni = $data->dni;
        $this->medico->direccion = $data->direccion;
        $this->medico->telefono = $data->telefono;
        $this->medico->email = $data->email;
        $this->medico->especialidad_id = $data->especialidad_id;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->medico->id);
        $stmt->bindParam(':nombre', $this->medico->nombre);
        $stmt->bindParam(':apellido', $this->medico->apellido);
        $stmt->bindParam(':dni', $this->medico->dni);
        $stmt->bindParam(':direccion', $this->medico->direccion);
        $stmt->bindParam(':telefono', $this->medico->telefono);
        $stmt->bindParam(':email', $this->medico->email);
        $stmt->bindParam(':especialidad_id', $this->medico->especialidad_id);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function count()
    {
        $query = "SELECT COUNT(*) FROM medico";
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