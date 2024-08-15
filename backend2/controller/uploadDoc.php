<?php

require_once '../config/cors_config.php';

if(isset($_FILES['file'])) {
    $file_name = $_FILES['file']['name'];
    $tmp_file_name = $_FILES['file']['tmp_name'];
    $new_file_name = '../files/og/' . $file_name;

    if(move_uploaded_file($tmp_file_name, $new_file_name)) {
        echo json_encode(array("message" => "exito"));
    } else {
        echo json_encode(array("message" => "fallo de subir"));
    }
} else {
    echo json_encode(array("message" => "fallo de archivo"));
}