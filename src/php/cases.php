<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['zoneId'])) {
        $zoneId = $_GET['zoneId'];
        $page = $_GET['page'];

        $offset = ($page - 1) * 15;

        $sql = "SELECT cases.case_id, 
        cases.case_name, 
        cases.acce_n, 
        cases.answ_n, 
        users.user_name AS user_name, 
        posts.post_date AS last_date, 
        posts.user_name AS last_user 
        FROM cases 
        INNER JOIN users ON cases.user_id = users.user_id 
        LEFT JOIN (
            SELECT p.case_id, p.post_date, u.user_name 
            FROM posts p 
            INNER JOIN users u ON p.user_id = u.user_id 
            WHERE p.post_id IN (
                SELECT MAX(post_id) 
                FROM posts 
                GROUP BY case_id
            )
        ) AS posts ON cases.case_id = posts.case_id
        WHERE cases.zone_id = '$zoneId' 
        ORDER BY last_date DESC 
        LIMIT 15 OFFSET $offset;";

        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $cases = array();

            while ($row = $result->fetch_assoc()) {
                $cases[] = array(
                    'case_id' => $row['case_id'], 
                    'case_name' => $row['case_name'], 
                    'acce_n' => $row['acce_n'], 
                    'answ_n' => $row['answ_n'], 
                    'user_name' => $row['user_name'], 
                    'last_date' => $row['last_date'],
                    'last_user' => $row['last_user']
                );
            }

            echo json_encode($cases);

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