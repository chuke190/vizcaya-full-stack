<?php

require_once '../config/cors_config.php';

class Paciente {
    private $conn;
    private $table_name = "paciente";

    public $id;
    public $tipoDocumento;
    public $docIdentidad;
    public $nombre;
    public $email;
    public $telefono;
    public $motivoConsulta;
    public $diagnostico;
    public $observaciones;
    public $bajoTratamientoMedico;
    public $propensoHemorragias;
    public $hipertenso;
    public $diabetico;
    public $embarazada;
    public $referidoPor;
    public $encargado;

    public function __construct($db)
    {
        $this->conn = $db;
    }
}