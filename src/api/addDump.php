<?php
require('db.php');
$_POST = json_decode(file_get_contents('php://input'), true);
$positionLat = $_POST['positionLat'];
$positionLon = $_POST['positionLon'];
$status = $_POST['status'];
$text = $_POST['text'];
$name = $_POST['name'];
$category = $_POST['category'];
$checkStatus = $_POST['checkStatus'];
$level = $_POST['level'];
$additional = $_POST['additional'];
$images = $_POST['images'];

if($_POST['positionLat']){
    $sql = mysqli_query($link, "INSERT INTO `dumps` (`positionLat`,`positionLon`,`status`,`text`,`name`,`category`,`checkStatus`,`level`,`additional`,`images`) VALUES ('$positionLat','$positionLon','$status','$text','$name','$category','$checkStatus','$level','$additional','$images')");
    echo("all is OK");
}else{
    echo("smth went wrong");
};
