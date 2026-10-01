<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "seafood_boil";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
