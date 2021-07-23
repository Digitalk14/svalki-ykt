<?php
require('db.php');
$_POST = json_decode(file_get_contents('php://input'), true);
$positionLat = $_POST['positionLat'];
$positionLon = $_POST['positionLon'];
$status = $_POST['status'];
$checkStatus = $_POST['checkStatus'];
$level = $_POST['level'];
$additional = $_POST['additional'];
$images = $_POST['images'];
$userEmail = $_POST['email'];
$userPhone = $_POST['phone'];

if($_POST['positionLat']){
    $sql = mysqli_query($link, "INSERT INTO `dumps` (`positionLat`,`positionLon`,`status`,`checkStatus`,`level`,`additional`,`images`,`email`,`phone`) VALUES ('$positionLat','$positionLon','$status','$checkStatus','$level','$additional','$images','$userEmail','$userPhone')");
    $from = "musorunet@sinet.team";
    $subject = "Заявка на сайте https://svalki.ykt.ru";
    $message = "Здравствуйте! Ваша заявка на добавление информации о мусоре получена. Благодарим!";
    $headers = "From:" . $from;
    if($userEmail){
        mail($userEmail,$subject,$message,$headers);
        echo "the email message was sent";
    }
}else{
    echo("smth went wrong");
};
