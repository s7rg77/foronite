<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

$data = json_decode(file_get_contents('php://input'));

$user_mail = $data->user_mail;
$user_pass = $data->user_pass;

$sql = "SELECT * FROM users 
WHERE user_mail = '$user_mail' 
AND user_pass = '$user_pass'";

$result = $connection->query($sql);

if ($result->num_rows > 0) {
    $response = "signinSQLok";
} else {
    $response = "signinSQLko";
}

echo json_encode($response);

$connection->close();
?>