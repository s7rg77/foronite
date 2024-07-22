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

        $sql = "SELECT cases.case_name, cases.case_text, 
        cases.case_date, users.user_name, users.user_icon, 
        users.user_sign, zones.zone_id, zones.zone_name, 
        cases.answ_n, cases.like_nu, cases.disl_nu, 
        IFNULL(likes_c.like_type, 0) AS like_type 
        FROM cases 
        INNER JOIN users ON cases.user_id = users.user_id 
        LEFT JOIN zones ON cases.zone_id = zones.zone_id 
        LEFT JOIN likes_c ON cases.case_id = likes_c.case_id 
        AND likes_c.user_id = '$userId' 
        WHERE cases.case_id = '$caseId'";

        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $case = array();

            while ($row = $result->fetch_assoc()) {
                $case[] = array(
                    'case_name' => $row['case_name'], 
                    'case_text' => $row['case_text'], 
                    'case_date' => $row['case_date'], 
                    'user_name' => $row['user_name'], 
                    'user_icon' => $row['user_icon'], 
                    'user_sign' => $row['user_sign'], 
                    'zone_id' => $row['zone_id'], 
                    'zone_name' => $row['zone_name'], 
                    'answ_n' => $row['answ_n'], 
                    'like_nu' => $row['like_nu'], 
                    'disl_nu' => $row['disl_nu'], 
                    'like_type' => $row['like_type']
                );
            }

            echo json_encode($case);

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