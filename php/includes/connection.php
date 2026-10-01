<?php
# Set MySQLi Reporting of Errors from MySQL
# mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function dbConnect($usertype, $connectionType = 'mysqli') {
    $host = 'localhost';
    $db = 'burmanski';
    if ($usertype  == 'read') {
        $user = 'burmanski';
        $pwd = 'Brey29q%fX6d';
    } elseif ($usertype == 'write') {
        $user = 'burmanski';
        $pwd = 'Brey29q%fX6d';
    } else {
        exit('Unrecognized user');
    }
    if ($connectionType == 'mysqli') {
         try {
             $conn = new mysqli($host, $user, $pwd, $db);
             $conn->set_charset('utf8mb4');
             return $conn;
         } catch (Exception $e) {
             exit($e->getMessage());
         }
    } else {
        try {
            return new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pwd);
        } catch (PDOException $e) {
            exit($e->getMessage());
        }
    }
}