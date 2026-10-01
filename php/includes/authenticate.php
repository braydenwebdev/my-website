<?php
declare(strict_types=1);
session_start();

/**
 * Authenticate user session.
 * Author File: authenticate_02.php
 */

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}
?>