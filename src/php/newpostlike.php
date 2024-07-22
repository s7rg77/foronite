<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = json_decode(file_get_contents("php://input"), true);

    $postId = $postData['postId'];
    $userId = $postData['userId'];
    $likeType = $postData['likeType'];

    $sql = "SELECT * FROM likes_p WHERE post_id = '$postId' AND user_id = '$userId'";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $sql = "UPDATE likes_p SET like_type = '$likeType' WHERE post_id = '$postId' AND user_id = '$userId'";
        if ($connection->query($sql) === TRUE) {
            echo json_encode(array("message" => "likeUPok"));
        } else {
            echo json_encode(array("error" => "likeUPko" . $connection->error));
        }
    } else {
        $sql = "INSERT INTO likes_p (post_id, user_id, like_type) VALUES ('$postId', '$userId', '$likeType')";
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