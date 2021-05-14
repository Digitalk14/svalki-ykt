<?php

// $host = '127.0.0.1';
// $user = 'root';
// $password = 'Akmid864197532';
// $database = 'svalki_ykt';

$host = 'mysql.server';
$user = 'svalki';
$password = 'F7s1_j4r';
$database = 'svalki_';
$link = new mysqli($host, $user, $password, $database);
$link->set_charset("utf8");
if ($link->connect_errno) {
  echo 'Не могу соединиться с Базой данных. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error();
  exit;
} 

// $link = mysql_connect('mysql.server:3306', 'svalki', 'F7s1_j4r');
// if (!$link) {
//     die('Ошибка соединения: ' . mysql_error());
// }else{
//   echo 'Успешно соединились';
// }
// mysql_close($link);
?>