<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['userId'])) {
        
        $userId = $_GET['userId'];

        $sql = "SELECT user_name, user_pass, 
        user_mail, user_icon, user_sign, user_date 
        FROM users WHERE user_id = '$userId'";

        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $user = array();
    
            while ($row = $result->fetch_assoc()) {
                $user[] = array(
                    'user_name' => $row['user_name'],
                    'user_pass' => $row['user_pass'],
                    'user_mail' => $row['user_mail'],
                    'user_icon' => $row['user_icon'],
                    'user_sign' => $row['user_sign'],
                    'user_date' => $row['user_date']
                );
            }
    
            echo json_encode($user);

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