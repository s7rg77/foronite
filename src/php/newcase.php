<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = json_decode(file_get_contents("php://input"), true);

    $caseName = $postData['caseName'];
    $caseText = $postData['caseText'];
    $userId = $postData['userId'];
    $zoneId = $postData['zoneId'];
    $caseDate = date("Y-m-d H:i:s", strtotime("+2 hours"));

    $sql = "INSERT INTO cases (case_name, case_text, user_id, zone_id, case_date) 
    VALUES ('$caseName', '$caseText', '$userId', '$zoneId', '$caseDate')";

    if ($connection->query($sql) === TRUE) {
        echo json_encode(array("message" => "caseSQLok"));
    } else {
        echo json_encode(array("error" => "caseSQLko: " . $connection->error));
    }
}

$connection->close();

?>