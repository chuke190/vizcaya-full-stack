<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/Evento.php';

class EventoController {
    private $conn;
    private $evento;

    public function __construct($db) {
        $this->conn = $db;
        $this->evento = new Evento($db);
    }

    public function passEventos() {
        $query = "SELECT * FROM calendario";
        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function addEvento() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO calendario (titulo, start, end) VALUES (:titulo, :start, :end)";

        $this->evento->titulo = $data->title;
        $this->evento->start = $data->start;
        $this->evento->end = $data->end;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':titulo', $this->evento->titulo);
        $stmt->bindParam(':start', $this->evento->start);
        $stmt->bindParam(':end', $this->evento->end);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }
}