<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if(isset($data['userId'])) {
        $userId = $data['userId'];

        if(isset($data['userSign'])) {

            $userSign = $data['userSign'];

            $sql = "UPDATE users SET user_sign = '$userSign' WHERE user_id = '$userId'";
            if ($connection->query($sql) !== TRUE) {
                $response = array('error' => 'editsignSQLko' . $connection->error);
                echo json_encode($response);
                exit;
            }

        }

        if(isset($data['userName'])) {

            $userName = $data['userName'];

            $sql = "UPDATE users SET user_name = '$userName' WHERE user_id = '$userId'";
            if ($connection->query($sql) !== TRUE) {
                $response = array('error' => 'editnameSQLko' . $connection->error);
                echo json_encode($response);
                exit;
            }

        }

        $response = array('editSQLok');
        echo json_encode($response);

    } else {
        $response = array('error' => 'postSQLko');
        echo json_encode($response);
    }
    
} else {
    $response = array('error' => 'postSQLko');
    echo json_encode($response);
}

$connection->close();

?>