<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $caseData = json_decode(file_get_contents("php://input"), true);

    $caseId = $caseData['caseId'];
    $userId = $caseData['userId'];
    $likeType = $caseData['likeType'];

    $sql = "SELECT * FROM likes_c WHERE case_id = '$caseId' AND user_id = '$userId'";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $sql = "UPDATE likes_c SET like_type = '$likeType' WHERE case_id = '$caseId' AND user_id = '$userId'";
        if ($connection->query($sql) === TRUE) {
            echo json_encode(array("message" => "likeUPok"));
        } else {
            echo json_encode(array("error" => "likeUPko" . $connection->error));
        }
    } else {
        $sql = "INSERT INTO likes_c (case_id, user_id, like_type) VALUES ('$caseId', '$userId', '$likeType')";
        if ($connection->query($sql) === TRUE) {
            echo json_encode(array("message" => "likeADDok"));
        } else {
            echo json_encode(array("error" => "likeADDko" . $connection->error));
        }
    }
} else {
    echo json_encode(array("error" => "likeADDko"));
}

$connection->close();

?>