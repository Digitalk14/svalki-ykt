<?php
require('db.php');

$result = $link->query("SELECT * FROM dumps");
$dumps;
while($row = mysqli_fetch_assoc($result)){
    $dump = array(
        'id' => $row['id'],
        'positionLat' => $row['positionLat'],
        'positionLon' => $row['positionLon'],
        'status' => $row['status'],
        'checkStatus' => $row['checkStatus'],
        'level' => $row['level'],
        'images' => $row['images'],
        'email' => $row['email'],
        'phone' => $row['phone'],
    );
    $dumps[] = $dump;
}
echo json_encode($dumps);
