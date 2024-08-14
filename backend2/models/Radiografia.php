<?php

require_once '../config/cors_config.php';

class Radiografia {
    private $conn;
    private $table_name = "radiografiasdigitales";

    public $id;
    public $paciente_id;
    public $ubicacion;

    public function __construct($db)
    {
        $this->conn = $db;
    }
}