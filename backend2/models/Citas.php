<?php

require_once '../config/cors_config.php';

class Citas
{
    private $conn;
    private $table_name = "cita";

    public $id;
    public $fecha;
    public $hora;
    public $paciente;
    public $medico;
    public $tratamiento;
    public $pagado;
    public $costo;
    public $estado;

    public function __construct($db)
    {
        $this->conn = $db;
    }
}