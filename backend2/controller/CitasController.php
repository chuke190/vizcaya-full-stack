<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/Citas.php';

class CitasController
{
    private $conn;
    private $cita;

    //Constructor
    public function __construct($db)
    {
        $this->conn = $db;
        $this->cita = new Citas($db);
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
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO cita (fecha, hora, paciente, medico, tratamiento, pagado, costo, estado) VALUES (:fecha, :hora, :paciente, :medico, :tratamiento, :pagado, :costo, :estado)";

        $this->cita->fecha = $data->fecha;
        $this->cita->hora = $data->hora;
        $this->cita->paciente = $data->paciente;
        $this->cita->medico = $data->medico;
        $this->cita->tratamiento = $data->tratamiento;
        $this->cita->pagado = $data->pagado;
        $this->cita->costo = $data->costo;
        $this->cita->estado = $data->estado;

        $stmt = $this->conn->prepare($query);

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

    public function count() {
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
