<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['caseId'])) {
        $caseId = $_GET['caseId'];
        $userId = $_GET['userId'];
        $page = $_GET['page'];
        
        $offset = ($page - 1) * 15;

        $sql = "SELECT posts.post_id, posts.post_text, 
        posts.post_date, users.user_name, users.user_icon, 
        users.user_sign, posts.like_nu, posts.disl_nu, 
        IFNULL(likes_p.like_type, 0) AS like_type 
        FROM posts 
        INNER JOIN users ON posts.user_id = users.user_id 
        LEFT JOIN likes_p ON posts.post_id = likes_p.post_id 
        AND likes_p.user_id = '$userId' 
        WHERE posts.case_id = '$caseId' 
        ORDER BY posts.post_date ASC
        LIMIT 15 OFFSET $offset;";

        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $posts = array();

            while ($row = $result->fetch_assoc()) {
                $posts[] = array(
                    'post_id' => $row['post_id'], 
                    'post_text' => $row['post_text'], 
                    'post_date' => $row['post_date'], 
                    'user_name' => $row['user_name'], 
                    'user_icon' => $row['user_icon'], 
                    'user_sign' => $row['user_sign'], 
                    'like_nu' => $row['like_nu'], 
                    'disl_nu' => $row['disl_nu'], 
                    'like_type' => $row['like_type']
                );
            }

            echo json_encode($posts);

        } else {
            $response = "error01";
        }
    } else {
        $response = "error02";
    }
} else {
    $response = "error03";
}

$connection->close();
?>