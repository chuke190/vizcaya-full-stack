<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/Pagos.php';

class PagosController {

    private $conn;
    private $pagos;

    public function __construct($db)
    {
        $this->conn = $db;
        $this->pagos = new Pagos($db);
    }

    public function passPagos() {
        $query = "SELECT * FROM pagos";
        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function addPago() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO pagos (paciente_id, tratamiento_id, enfermedad, fecha, hora, costo, pagado, saldo, recibidoPor)
                  VALUES (:paciente_id, :tratamiento_id, :enfermedad, :fecha, :hora, :costo, :pagado, :saldo, :recibidoPor)";

        $this->pagos->paciente_id = $data->paciente_id;
        $this->pagos->tratamiento_id = $data->tratamiento_id;
        $this->pagos->enfermedad = $data->enfermedad;
        $this->pagos->fecha = $data->fecha;
        $this->pagos->hora = $data->hora;
        $this->pagos->costo = $data->costo;
        $this->pagos->pagado = $data->pagado;
        $this->pagos->saldo = $data->saldo;
        $this->pagos->recibidoPor = $data->recibidoPor;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':paciente_id', $this->pagos->paciente_id);
        $stmt->bindParam(':tratamiento_id', $this->pagos->tratamiento_id);
        $stmt->bindParam(':enfermedad', $this->pagos->enfermedad);
        $stmt->bindParam(':fecha', $this->pagos->fecha);
        $stmt->bindParam(':hora', $this->pagos->hora);
        $stmt->bindParam(':costo', $this->pagos->costo);
        $stmt->bindParam(':pagado', $this->pagos->pagado);
        $stmt->bindParam(':saldo', $this->pagos->saldo);
        $stmt->bindParam(':recibidoPor', $this->pagos->recibidoPor);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "exito"));
        } else {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function deletePago() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "DELETE FROM pagos WHERE id = :id";

        $this->pagos->id = $data->id;

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->pagos->id);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "exito"));
        } else {
            echo json_encode(array("message" => "fallo"));
        }
    }
}