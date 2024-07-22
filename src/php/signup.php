s<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

$data = json_decode(file_get_contents('php://input'));

$user_mail = $data->user_mail;
$user_pass = $data->user_pass;
$user_name = $data->user_name;
$user_id = $data->user_id;
$user_date = date("Y-m-d H:i:s", strtotime("+2 hours"));

$sql = "INSERT INTO users (user_mail, user_pass, user_name, user_id, user_date) 
VALUES ('$user_mail', '$user_pass', '$user_name', '$user_id', '$user_date')";

if ($connection->query($sql) === TRUE) {
    $response = "signupSQLok";
} else {
    $response = "signupSQLko";
}

echo json_encode($response);

$connection->close();
?>