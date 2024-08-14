<?php 

require_once '../config/cors_config.php';

class Pagos {
    private $conn;
    private $table_name = "pagos";

    public $id;
    public $paciente_id;
    public $tratamiento_id;
    public $enfermedad;
    public $fecha;
    public $hora;
    public $costo;
    public $pagado;
    public $saldo;
    public $recibidoPor;

    public function __construct($db)
    {
        $this->conn = $db;
    }
}