<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/Radiografia.php';
require_once '../models/Odontograma.php';

//archivo usado para manejar las subidas de imagenes y documentos, el codigo debe de subir el archivo a la carpeta correspondiente y posteriormente agregar
//la ruta del archivo a la base de datos, permitiendo que en la proxima seleccion del paciente se pueda visualizar el archivo subido

class Upload
{

    private $conn;
    private $radiografia;
    private $odontograma;

    public function __construct($db)
    {
        $this->conn = $db;
        $this->radiografia = new Radiografia($db);
        $this->odontograma = new Odontograma($db);
    }

    function uploadFile()
    {
        $data = json_decode(file_get_contents("php://input"));
        $this->paciente_id = $data->paciente_id;
        $this->archivoName = $data->archivoName;
        if (isset($_FILES['file'])) {
            $file = $_FILES['file']['name'];
            $uploadDir = '../files/';
            $uploadFile = $uploadDir . basename($file['name']);

            // Mover el archivo subido a la carpeta de destino
            if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
                // Obtener la ruta del archivo
                $filePath = $uploadFile;

                // Guardar la referencia en la base de datos
                $database = new Database();
                $db = $database->dbConnect();
                $query = "INSERT INTO odontograma (paciente_id, ubicacion) VALUES (:paciente_id, :ubicacion)";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':ubicacion', $filePath);

                if ($stmt->execute()) {
                    echo "El archivo ha sido subido y la referencia guardada en la base de datos.";
                    echo json_encode(array("message" => "exito"));
                } else {
                    echo "Error al guardar la referencia en la base de datos.";
                }
            } else {
                echo "Error al subir el archivo.";
            }
        } else {
            echo "No se ha recibido ningún archivo.";
        }
    }
}