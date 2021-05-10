<?php
require('db.php');
$_POST = json_decode(file_get_contents('php://input'), true);
// $id = $_POST['googleId'];
// echo $id;
$result = $link->query("SELECT googleId FROM users");
$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
// var_dump(json_encode($rows));
$object_id = array_column($rows, 'googleId');
// var_dump($object_id);
// echo json_encode($rows);
if(in_array($_POST['googleId'],$object_id)){
    echo 'true';
}else{
    echo 'false';
}
// echo json_decode($rows);
// if( in_array($_POST['googleId'], json_encode(array_values($rows)))){
//     echo 'gut';
// }else{
//     echo 'not gut';
// }
$result->free();