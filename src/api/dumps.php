<?php
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
        'additional' => $row['additional']
    );
    $users[] = $user;
}
echo json_encode($users);
