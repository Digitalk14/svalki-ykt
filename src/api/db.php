<?php

$host = '127.0.0.1';
$user = 'root';
$password = 'Akmid864197532';
$database = 'svalki_ykt';

// $host = 'mysql.server';
// $user = 'svalki';
// $password = 'F7s1_j4r';
// $database = 'svalki_';
$link = new mysqli($host, $user, $password, $database);
$link->set_charset("utf8");
if ($link->connect_errno) {
  echo 'Не могу соединиться с Базой данных. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error();
  exit;
} 

?>