<?php

require_once '../config/cors_config.php';

class Especialidad
{
    private $conn;
    private $table_name = "especialidad";

    public $id;
    public $nombre;

    public function __construct($db)
    {
        $this->conn = $db;
    }
}