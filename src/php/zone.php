<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['zoneId'])) {

        $zoneId = $_GET['zoneId'];

        $sql = "SELECT zones.zone_name, 
        COUNT(cases.case_id) AS case_nu 
        FROM zones 
        LEFT JOIN cases 
        ON zones.zone_id = cases.zone_id 
        WHERE zones.zone_id = $zoneId 
        GROUP BY zones.zone_name";

        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $zone = array();

            while ($row = $result->fetch_assoc()) {
                $zone[] = array(
                    'zone_name' => $row['zone_name'],
                    'case_nu' => $row['case_nu']
                );
            }

            echo json_encode($zone);
            
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