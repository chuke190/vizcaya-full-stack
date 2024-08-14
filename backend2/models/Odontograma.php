<?php

require_once '../config/cors_config.php';

class Odontograma {
    private $conn;
    private $table_name = "odontograma";

    public $id;
    public $paciente_id;
    public $ubicacion;

    public function __construct($db)
    {
        $this->conn = $db;
    }
}