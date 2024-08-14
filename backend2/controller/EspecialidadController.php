<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/Especialidad.php';

class EspecialidadController {
    private $conn;
    private $especialidad;

    public function __construct($db) {
        $this->conn = $db;
        $this->especialidad = new Especialidad($db);
    }

    public function passEspecialidades() {
        $query = "SELECT * FROM especialidad";
        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function addEspecialidad() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO especialidad (nombre) VALUES (:nombre)";

        $this->especialidad->nombre = $data->nombre;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':nombre', $this->especialidad->nombre);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function deleteEspecialidad() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "DELETE FROM especialidad WHERE id = :id";

        $this->especialidad->id = $data->id;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->especialidad->id);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function dropEspecialidades() {
        $query = "DELETE FROM especialidad";
        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function updateEspecialidad() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "UPDATE especialidad SET nombre = :nombre WHERE id = :id";

        $this->especialidad->id = $data->id;
        $this->especialidad->nombre = $data->nombre;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->especialidad->id);
        $stmt->bindParam(':nombre', $this->especialidad->nombre);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function getSingleEspecialidad() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "SELECT * FROM especialidad WHERE id = :id";

        $this->especialidad->id = $data->id;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->especialidad->id);

        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

}