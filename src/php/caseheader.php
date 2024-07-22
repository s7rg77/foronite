<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['caseId'])) {

        $caseId = $_GET['caseId'];

        $sql = "SELECT cases.case_name, zones.zone_name, 
                       COUNT(posts.post_id) AS post_nu 
                FROM cases 
                LEFT JOIN zones ON cases.zone_id = zones.zone_id 
                LEFT JOIN posts ON cases.case_id = posts.case_id 
                WHERE cases.case_id = '$caseId' 
                GROUP BY cases.case_id";

        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $case = array();

            while ($row = $result->fetch_assoc()) {
                $case[] = array(
                    'case_name' => $row['case_name'], 
                    'zone_name' => $row['zone_name'], 
                    'post_nu' => $row['post_nu']
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