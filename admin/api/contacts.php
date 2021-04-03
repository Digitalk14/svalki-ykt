<?php
require('db.php');

$result = $link->query("SELECT * FROM dumps");
$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($rows);
$result->free();
