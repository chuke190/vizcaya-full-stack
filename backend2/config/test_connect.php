<?php
require_once 'database.php';

$database = new Database();
$conn = $database->dbConnect();

if ($conn) {
    echo "Conexión exitosa a la base de datos.";
} else {
    echo "Error al conectar a la base de datos.";
}