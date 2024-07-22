<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    $sql = "SELECT zone_id, zone_name FROM zones";

    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $zoneNames = array();

        while ($row = $result->fetch_assoc()) {
            $zones[] = $row;
        }

        echo json_encode($zones);
    } else {
        $response = "error01";
    }
} else {
    $response = "error02";
}

$connection->close();
?>