<?php
require('db.php');

$result = $link->query("SELECT id, positionLat, positionLon, status, checkStatus, level, additional, images FROM dumps");
$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($rows);
$result->free();
