<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $sql = "SELECT cases.case_id, 
        cases.case_name, 
        cases.acce_n, 
        cases.answ_n, 
        cases.like_nu, 
        cases.disl_nu, 
        users.user_name AS user_name, 
        posts.post_date AS last_date, 
        posts.user_name AS last_user, 
        zones.zone_name  
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
        LEFT JOIN zones ON cases.zone_id = zones.zone_id 
        ORDER BY last_date DESC LIMIT 15;";
    
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $cases = array();

        while ($row = $result->fetch_assoc()) {
            $case = array(
                'case_id' => $row['case_id'], 
                'case_name' => $row['case_name'], 
                'acce_n' => $row['acce_n'], 
                'answ_n' => $row['answ_n'], 
                'like_nu' => $row['like_nu'], 
                'disl_nu' => $row['disl_nu'], 
                'user_name' => $row['user_name'], 
                'last_date' => $row['last_date'], 
                'last_user' => $row['last_user'], 
                'zone_name' => $row['zone_name']
            );
            $cases[] = $case;
        }

        echo json_encode($cases);
    } else {
        $response = "error01";
    }
} else {
    $response = "error02";
}

$connection->close();
?>