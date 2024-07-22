<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['searchText'])) {
        $searchText = $_GET['searchText'];

        $sql = "SELECT cases.case_id, 
        cases.case_name, users.user_name, 
        COUNT(posts.case_id) AS size_case, 
        IFNULL(MAX(posts.post_date), cases.case_date) AS last_date 
        FROM cases INNER JOIN users 
        ON cases.user_id = users.user_id 
        LEFT JOIN posts ON cases.case_id = posts.case_id 
        WHERE cases.case_name LIKE '%$searchText%' 
        GROUP BY cases.case_id, users.user_name, cases.case_date 
        ORDER BY last_date DESC 
        LIMIT 10;";

        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $cases = array();

            while ($row = $result->fetch_assoc()) {
                $cases[] = array(
                    'case_id' => $row['case_id'],
                    'case_name' => $row['case_name'],
                    'user_name' => $row['user_name'],
                    'size_case' => $row['size_case'],
                    'last_date' => $row['last_date']
                );
            }

            echo json_encode($cases);

        } else {
            $response = "errorSQLko01";
        }
    } else {
        $response = "errorSQLko02";
    }
} else {
    $response = "errorSQLko03";
}

$connection->close();
?>