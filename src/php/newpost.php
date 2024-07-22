<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = json_decode(file_get_contents("php://input"), true);

    $userId = $postData['userId'];
    $caseId = $postData['caseId'];
    $postText = $postData['postText'];
    $postDate = date("Y-m-d H:i:s", strtotime("+2 hours"));

    $sql = "INSERT INTO posts (user_id, case_id, post_text, post_date) 
    VALUES ('$userId', '$caseId', '$postText', '$postDate')";

    if ($connection->query($sql) === TRUE) {
        echo json_encode(array("message" => "postSQLok"));
    } else {
        echo json_encode(array("error" => "postSQLko: " . $connection->error));
    }
}

$connection->close();

?>