<?php
$to = $_POST['to'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$from = $_POST['from'];
$headers = "From:" . $from;
mail($to,$subject,$message,$headers);
?>