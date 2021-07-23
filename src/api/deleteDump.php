<?php
require('db.php');
$_POST = json_decode(file_get_contents('php://input'), true);

if($_POST['id']){
    $sql = mysqli_query($link, "DELETE FROM `dumps` WHERE id = '".$_POST['id']."' ");
   
}else{
    echo("smth went wrong");
};
