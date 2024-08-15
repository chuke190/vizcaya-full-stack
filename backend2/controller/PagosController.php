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
        $query = "SELECT pag.*, p.nombre as paciente_nombre, t.tratamiento as
        tratamiento_nombre FROM pago pag JOIN paciente p ON pag.paciente = p.id
        JOIN tratamiento t ON pag.tratamiento = t.id;";

        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo" . $e));
        }
    }

    public function addPago() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO pagos (paciente, tratamiento, fecha, hora, costo, pagado, saldo, recibidoPor)
                  VALUES (:paciente, :tratamiento, :fecha, :hora, :costo, :pagado, :saldo, :recibidoPor)";

        $this->pagos->paciente = $data->paciente;
        $this->pagos->tratamiento = $data->tratamiento;
        $this->pagos->fecha = $data->fecha;
        $this->pagos->hora = $data->hora;
        $this->pagos->costo = $data->costo;
        $this->pagos->pagado = $data->pagado;
        $this->pagos->saldo = $data->saldo;
        $this->pagos->recibidoPor = $data->recibidoPor;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':paciente', $this->pagos->paciente);
        $stmt->bindParam(':tratamiento', $this->pagos->tratamiento);
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
        $query = "DELETE FROM pago WHERE id = :id";

        $this->pagos->id = $data->id;

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->pagos->id);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "exito"));
        } else {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function cobrarPago() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "UPDATE pago SET saldo = saldo - :pagado, pagado = pagado + :pagado WHERE id = :id";

        $this->pagos->id = $data->id;
        $this->pagos->pagado = $data->pagado;
        $this->pagos->saldo = $data->saldo;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->pagos->id);
        $stmt->bindParam(':pagado', $this->pagos->pagado);
        $stmt->bindParam(':saldo', $this->pagos->saldo);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "exito"));
        } else {
            echo json_encode(array("message" => "fallo"));
        }
    }
}