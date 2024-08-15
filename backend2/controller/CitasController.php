<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/Citas.php';
require_once '../models/Pagos.php';
require_once '../models/Tratamiento.php';



class CitasController
{
    private $conn;
    private $cita;
    private $tratamiento;
    private $pago;
    

    //Constructor
    public function __construct($db)
    {
        $this->conn = $db;
        $this->cita = new Citas($db);
        $this->tratamiento = new Tratamiento($db);
        $this->pago = new Pagos($db);
    }

    public function passCitas()
    {
        $query = "SELECT c.*, p.nombre as paciente_nombre, m.nombre as medico_nombre,
        t.tratamiento as tratamiento_nombre FROM cita c JOIN paciente p ON c.paciente = p.id
        JOIN medico m ON c.medico = m.id JOIN tratamiento t ON c.tratamiento = t.id; ";
        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function addCita()
    {
        $valorCero = 0;
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO cita (fecha, hora, paciente, medico, costo, tratamiento, pagado, estado) VALUES (:fecha, :hora, :paciente, :medico, :costo, :tratamiento, :pagado, :estado)";
        $queryPago = "INSERT INTO pago (paciente, tratamiento, fecha, hora, costo, pagado, saldo, recibidoPor) VALUES (:paciente, :tratamiento, :fecha, :hora, :costo, :pagado, :saldo, :recibidoPor)";

        $this->cita->fecha = $data->fecha;
        $this->cita->hora = $data->hora;
        $this->cita->paciente = $data->paciente;
        $this->cita->medico = $data->medico;
        $this->cita->costo = $data->costo;
        $this->cita->tratamiento = $data->tratamiento;
        $this->cita->pagado = $data->pagado;
        $this->cita->estado = $data->estado;
        $this->pago->recibidoPor = $data->recibidoPor;

        $this->conn->beginTransaction();

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':fecha', $this->cita->fecha);
            $stmt->bindParam(':hora', $this->cita->hora);
            $stmt->bindParam(':paciente', $this->cita->paciente);
            $stmt->bindParam(':medico', $this->cita->medico);
            $stmt->bindParam(':costo', $this->cita->costo);
            $stmt->bindParam(':tratamiento', $this->cita->tratamiento);
            $stmt->bindParam(':pagado', $this->cita->pagado);
            $stmt->bindParam(':estado', $this->cita->estado);

            $stmt->execute();

            $stmt = $this->conn->prepare($queryPago);
            $stmt->bindParam(':paciente', $this->cita->paciente);
            $stmt->bindParam(':tratamiento', $this->cita->tratamiento);
            $stmt->bindParam(':fecha', $this->cita->fecha);
            $stmt->bindParam(':hora', $this->cita->hora);
            $stmt->bindParam(':costo', $this->cita->costo);
            $stmt->bindParam(':pagado', $valorCero);
            $stmt->bindParam(':saldo', $this->cita->costo);
            $stmt->bindParam(':recibidoPor', $this->pago->recibidoPor);

            $stmt->execute();

            $this->conn->commit();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            $this->conn->rollBack();
            echo json_encode(array("message" => "fallo" . $e));
        }
    }

    public function deleteCita()
    {
        $data = json_decode(file_get_contents("php://input"));
        $query = "DELETE FROM cita WHERE id = :id";

        $this->cita->id = $data->id;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->cita->id);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function updateCita()
    {
        $data = json_decode(file_get_contents("php://input"));
        $query = "UPDATE cita SET fecha = :fecha, hora = :hora, paciente = :paciente, medico = :medico, tratamiento = :tratamiento, pagado = :pagado, costo = :costo, estado = :estado WHERE id = :id";

        $this->cita->id = $data->id;
        $this->cita->fecha = $data->fecha;
        $this->cita->hora = $data->hora;
        $this->cita->paciente = $data->paciente;
        $this->cita->medico = $data->medico;
        $this->cita->tratamiento = $data->tratamiento;
        $this->cita->pagado = $data->pagado;
        $this->cita->costo = $data->costo;
        $this->cita->estado = $data->estado;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->cita->id);
        $stmt->bindParam(':fecha', $this->cita->fecha);
        $stmt->bindParam(':hora', $this->cita->hora);
        $stmt->bindParam(':paciente', $this->cita->paciente);
        $stmt->bindParam(':medico', $this->cita->medico);
        $stmt->bindParam(':tratamiento', $this->cita->tratamiento);
        $stmt->bindParam(':pagado', $this->cita->pagado);
        $stmt->bindParam(':costo', $this->cita->costo);
        $stmt->bindParam(':estado', $this->cita->estado);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function count()
    {
        $query = "SELECT COUNT(*) FROM cita";
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
