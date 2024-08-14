<?php

require_once '../config/cors_config.php';

class Medico {
    private $conn;
    private $table_name = "medico";

    public $id;
    public $nombre;
    public $apellido;
    public $dni;
    public $direccion;
    public $telefono;
    public $email;
    public $especialidad_id;

    public function __construct($db)
    {
        $this->conn = $db;
    }

}