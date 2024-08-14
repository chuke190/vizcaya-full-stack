<?php

require_once '../config/cors_config.php';

class Tratamiento {
    private $conn;
    private $table_name = "tratamiento";

    public $id;
    public $tratamiento;
    public $costo;

    public function __construct($db)
    {
        $this->conn = $db;
    }

}