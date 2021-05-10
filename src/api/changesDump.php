<?php
require('db.php');
$_POST = json_decode(file_get_contents('php://input'), true);
$result = $link->query("UPDATE dumps SET checkStatus = '".$_POST['checkStatus']."', status = '".$_POST['status']."', level = '".$_POST['level']."', images = '".$_POST['images']."' WHERE id = '".$_POST['id']."' ");
var_dump($result);
