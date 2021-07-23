<?php
    error_reporting(E_ALL);
    $from = "musorunet@sinet.team";
    $to = "vasilievdmtr@gmail.com";
    $subject = "Заявка на сайте https://svalki.ykt.ru";
    $message = "Здравствуйте! Ваша заявка на добавление информации о мусоре получена. Благодарим!";
    $headers = "From:" . $from;
    mail($to,$subject,$message,$headers);
    echo "the email message was sent";
?>