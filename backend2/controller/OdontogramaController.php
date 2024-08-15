<?php

require_once '../config/cors_config.php';

class OdontogramaController {
    private $conn;
    private $table_name = "odontograma";

    public $id;
    public $paciente_id;
    public $ubicacion;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function passOdontogramas()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function addOdontograma()
    {
        $query = "INSERT INTO " . $this->table_name . " SET paciente_id=:paciente_id, ubicacion=:ubicacion";
        $stmt = $this->conn->prepare($query);

        $this->paciente_id = htmlspecialchars(strip_tags($this->paciente_id));
        $this->ubicacion = htmlspecialchars(strip_tags($this->ubicacion));

        $stmt->bindParam(":paciente_id", $this->paciente_id);
        $stmt->bindParam(":ubicacion", $this->ubicacion);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function deleteOdontograma()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function updateOdontograma()
    {
        $query = "UPDATE " . $this->table_name . " SET paciente_id=:paciente_id, ubicacion=:ubicacion WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->paciente_id = htmlspecialchars(strip_tags($this->paciente_id));
        $this->ubicacion = htmlspecialchars(strip_tags($this->ubicacion));

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":paciente_id", $this->paciente_id);
        $stmt->bindParam(":ubicacion", $this->ubicacion);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}