<?php 

require_once '../config/cors_config.php';

class Pagos {
    private $conn;
    private $table_name = "pago";

    public $id;
    public $fecha;
    public $paciente;
    public $tratamiento;
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