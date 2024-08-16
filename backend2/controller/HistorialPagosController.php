<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/HistorialPagos.php';

class HistorialPagosController {
    private $conn;
    private $historialPagos;

    public function __construct($db) {
        $this->conn = $db;
        $this->historialPagos = new HistorialPagos($db);
    }

    public function passHistorialPagos() {
        $query = "SELECT * FROM historialpagos";
        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function getHistorialPagos() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "SELECT * FROM historialpagos WHERE pago_id = :pago_id";

        $this->historialPagos->pago_id = $data->pago_id;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':pago_id', $this->historialPagos->pago_id);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function addHistorialPago() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO historialpagos (pago_id, cantidad, fecha, recibio) VALUES (:pago_id, :cantidad, :fecha, :recibio)";

        $this->historialPagos->pago_id = $data->pago_id;
        $this->historialPagos->cantidad = $data->cantidad;
        $this->historialPagos->fecha = $data->fecha;
        $this->historialPagos->recibio = $data->recibio;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':pago_id', $this->historialPagos->pago_id);
        $stmt->bindParam(':cantidad', $this->historialPagos->cantidad);
        $stmt->bindParam(':fecha', $this->historialPagos->fecha);
        $stmt->bindParam(':recibio', $this->historialPagos->recibio);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }
}