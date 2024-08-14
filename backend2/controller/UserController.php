<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/User.php';

class UserController {
    private $conn;
    private $user;

    public function __construct($db) {
        $this->conn = $db;
        $this->user = new User($db);
    }

    public function passUsers() {
        $query = "SELECT * FROM usuario";
        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function addUser() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO usuario (nombre, contra, email, rol, telefono, tipoDocumento, noDocumento)
        VALUES (:nombre, :contra, :email, :rol, :telefono, :tipoDocumento, :noDocumento)";

        $this->user->nombre = $data->nombre;
        $this->user->contra = $data->contra;
        $this->user->email = $data->email;
        $this->user->rol = $data->rol;
        $this->user->telefono = $data->telefono;
        $this->user->tipoDocumento = $data->tipoDocumento;
        $this->user->noDocumento = $data->noDocumento;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':nombre', $this->user->nombre);
        $stmt->bindParam(':contra', $this->user->contra);
        $stmt->bindParam(':email', $this->user->email);
        $stmt->bindParam(':rol', $this->user->rol);
        $stmt->bindParam(':telefono', $this->user->telefono);
        $stmt->bindParam(':tipoDocumento', $this->user->tipoDocumento);
        $stmt->bindParam(':noDocumento', $this->user->noDocumento);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function deleteUser() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "DELETE FROM usuario WHERE id = :id";

        $this->user->id = $data->id;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->user->id);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function updateUser() {
        $data = json_decode(file_get_contents("php://input"));
        $query = "UPDATE usuario SET nombre = :nombre, email = :email, rol = :rol, telefono = :telefono,
        tipoDocumento = :tipoDocumento,noDocumento = :noDocumento WHERE id = :id";

        $this->user->id = $data->id;
        $this->user->nombre = $data->nombre;
        $this->user->email = $data->email;
        $this->user->rol = $data->rol;
        $this->user->telefono = $data->telefono;
        $this->user->tipoDocumento = $data->tipoDocumento;
        $this->user->noDocumento = $data->noDocumento;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->user->id);
        $stmt->bindParam(':nombre', $this->user->nombre);
        $stmt->bindParam(':email', $this->user->email);
        $stmt->bindParam(':rol', $this->user->rol);
        $stmt->bindParam(':telefono', $this->user->telefono);
        $stmt->bindParam(':tipoDocumento', $this->user->tipoDocumento);
        $stmt->bindParam(':noDocumento', $this->user->noDocumento);

        try {
            $stmt->execute();
            echo json_encode(array("message" => "exito"));
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }

    public function count()
    {
        $query = "SELECT COUNT(*) FROM usuario";
        $stmt = $this->conn->prepare($query);

        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $e) {
            echo json_encode(array("message" => "fallo"));
        }
    }
}

$database = new Database();
$db = $database->dbConnect();