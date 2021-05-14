<?php
require('db.php');
$result = $link->query("SELECT `id`, `positionLat`, `positionLon`, `status`, `checkStatus`, `level`, `additional`, `images` FROM `dumps`");
$users;
while ($row = mysqli_fetch_assoc($result)) {
    $user = array(
        'id' => $row['id'],
        'positionLat' => $row['positionLat'],
        'positionLon' => $row['positionLon']
    );
    $users[] = $user;
}
echo json_encode($users);

// $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
// echo json_encode($rows);
// $result->free();
