<?php

require_once '../config/cors_config.php';
require_once '../config/database.php';
require_once '../models/User.php';

class AuthController {
    private $conn;
    private $user;

    public function __construct($db) {
        $this->conn = $db;
        $this->user = new User($db);
    }

    public function loginPass() {
        $data = json_decode(file_get_contents("php://input"));

        $this->user->email = $data->email;
        $this->user->contra = $data->contra;

        $result = $this->user->login();

        if ($result) {
            echo json_encode(array("message" => "exito", "user" => $result));
        } else {
            echo json_encode(array("message" => "fallo"));
        }
    }
}

$database = new Database();
$db = $database->dbConnect();

$auth = new AuthController($db);
$auth->loginPass();