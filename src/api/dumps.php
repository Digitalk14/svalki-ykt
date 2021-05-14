<?php
// require('db.php');
// $result = $link->query("SELECT `id`, `positionLat`, `positionLon`, `status`, `checkStatus`, `level`, `additional`, `images` FROM `dumps`");
// $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
// echo json_encode($rows);
// $result->free();
require('db.php');
$result = $link->query("SELECT `id`, `positionLat`, `positionLon`, `status`, `checkStatus`, `level`, `additional`, `images` FROM `dumps`");
$users;
while ($row = mysqli_fetch_assoc($result)) {
    $user = array(
        'id' => $row['id'],
        'positionLat' => $row['positionLat'],
        'positionLon' => $row['positionLon'],
        'status' => $row['status'],
        'checkStatus' => $row['checkStatus'],
        'level' => $row['level'],
        'images' => $row['images'],
    );
    $users[] = $user;
}
echo json_encode($users);
