<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/Tratamiento.php';

class TratamientoController {

    private $conn;
    private $tratamiento;

    //Constructor
    public function __construct($db)
    {
        $this->conn = $db;
        $this->tratamiento = new Tratamiento($db);
    }

    public function passTratamientos() {
        $query = "SELECT * FROM tratamiento";
        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function addTratamiento() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO tratamiento (tratamiento, costo) VALUES (:tratamiento, :costo)";

        $this->tratamiento->tratamiento = $data->tratamiento;
        $this->tratamiento->costo = $data->costo;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':tratamiento', $this->tratamiento->tratamiento);
        $stmt->bindParam(':costo', $this->tratamiento->costo);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "exito"));
        } else {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function deleteTratamiento() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "DELETE FROM tratamiento WHERE id = :id";

        $this->tratamiento->id = $data->id;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->tratamiento->id);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "exito"));
        } else {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function updateTratamiento() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "UPDATE tratamiento SET tratamiento = :tratamiento, costo = :costo WHERE id = :id";

        $this->tratamiento->id = $data->id;
        $this->tratamiento->tratamiento = $data->tratamiento;
        $this->tratamiento->costo = $data->costo;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->tratamiento->id);
        $stmt->bindParam(':tratamiento', $this->tratamiento->tratamiento);
        $stmt->bindParam(':costo', $this->tratamiento->costo);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "exito"));
        } else {
            echo json_encode(array("message" => "fallo"));
        }
    }
}