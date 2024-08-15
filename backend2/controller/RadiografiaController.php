<?php

require_once '../config/cors_config.php';

class RadiografiaController
{
    private $conn;
    private $table_name = "radiografiasdigitales";

    public $id;
    public $paciente_id;
    public $ubicacion;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function passRadiografias()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function addRadiografia()
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

    public function deleteRadiografia()
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

    public function updateRadiografia()
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