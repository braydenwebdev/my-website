<?php
declare(strict_types=1);
session_start();

/**
 * Log out the user and destroy session.
 */

$_SESSION = [];
session_destroy();

header('Location: login.php');
exit();
?>