<?php

require_once '../config/cors_config.php';

class User
{
    private $conn;
    private $table_name = "usuario";

    public $id;
    public $nombre;
    public $contra;
    public $email;
    public $rol;
    public $telefono;
    public $tipoDocumento;
    public $noDocumento;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function login()
    {
        // Función para sanitizar datos
        function sanitize($data)
        {
            return htmlspecialchars(strip_tags($data));
        }

        // Sanitizar todos los campos
        $this->email = sanitize($this->email);
        $this->contra = sanitize($this->contra);

        // Preparar la consulta SQL
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = :email AND contra = :contra";

        $stmt = $this->conn->prepare($query);

        // Vincular los parámetros
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':contra', $this->contra);

        // Ejecutar la consulta y manejar errores
        try {
            if ($stmt->execute()) {
                return $stmt->fetch(PDO::FETCH_ASSOC);
            }
        } catch (PDOException $e) {
            error_log("Error al iniciar sesión: " . $e->getMessage());
        }
        return false;
    }
}