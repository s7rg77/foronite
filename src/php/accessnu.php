<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

        $caseId = $data['caseId'];

        $sql = "UPDATE cases SET acce_n = acce_n + 1 WHERE case_id = '$caseId'";

        if ($connection->query($sql) === TRUE) {
            echo json_encode(array("message" => "accessnuSQLok"));
        } else {
            echo json_encode(array("error" => "accessnuSQLko: " . $connection->error));
        }
}

$connection->close();
?>