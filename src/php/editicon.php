<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['userId'])) {
        $userId = $_POST['userId'];

        $randomName = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 5);

        $target_dir = "img/";
        $target_file = $target_dir . $randomName . '.' . pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);

        $fileName = basename($target_file);

        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {

            $sql = "UPDATE users SET user_icon='$fileName' WHERE user_id='$userId'";

            if ($connection->query($sql) === TRUE) {
                echo json_encode(array("message" => "iconSQLok"));
            } else {
                echo json_encode(array("error" => "iconSQLko: " . $connection->error));
            }
        } else {
            echo json_encode(array("error01"));
        }
    } else {
        echo json_encode(array("error02"));
    }
} else {
    echo json_encode(array("error03"));
}

$connection->close();

?>
