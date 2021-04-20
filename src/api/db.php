<?php

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'svalki_ykt';
// $host = 'localhost';
// $user = 'u1187016_default';
// $password = 'df!98OM_';
// $database = 'u1187016_default';
$link = new mysqli($host, $user, $password, $database);
if (!$link) {
  echo 'Не могу соединиться с Базой данных. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error();
  exit;
} 
$link->set_charset("utf8");