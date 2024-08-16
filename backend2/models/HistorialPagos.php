<?php

require_once '../config/cors_config.php';

class HistorialPagos
{
    private $conn;
    private $table_name = "historialpagos";

    public $id;
    public $pago_id;
    public $cantidad;
    public $fecha;
    public $recibio;

    public function __construct($db)
    {
        $this->conn = $db;
    }

}
