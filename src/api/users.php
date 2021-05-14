<?php
require('db.php');
$_POST = json_decode(file_get_contents('php://input'), true);

$result = $link->query("SELECT `googleId` FROM `users`");
$users;
while ($row = mysqli_fetch_assoc($result)){
    $user = array(
        'googleId' => $row['googleId'],
    );
    $users[] = $user;
}

$object_id = array_column($users, 'googleId');

if(in_array($_POST['googleId'],$object_id)){
    echo 'true';
}else{
    echo 'false';
}

$result->free();