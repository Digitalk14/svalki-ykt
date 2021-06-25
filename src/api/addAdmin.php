<?php
require('db.php');
$_POST = json_decode(file_get_contents('php://input'), true);
$name = $_POST['name'];
$googleId = $_POST['googleId'];
echo $name;
echo $googleId;
if($_POST['googleId']){
    $sql = mysqli_query($link, "INSERT INTO `users` (`user`,`googleId`) VALUES ('$name','$googleId')");
    if(!$sql){
        echo 'error';
    }else{
        echo 'OK!!!';
    }
}else{
    echo("smth went wrong");
};