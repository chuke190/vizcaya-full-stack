<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/Evento.php';

class Evento {
    private $conn;
    private $table_name = "calendario";

    public $id;
    public $titulo;
    public $start;
    public $end;

    public function __construct($db)
    {
        $this->conn = $db;
    }
}

