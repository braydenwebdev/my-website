<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bayou Boil & Catch</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<header class="navbar">
    <div class="logo">Bayou Boil & Catch</div>
    <nav>
        <a href="index.html">Home</a>
        <a href="menu.php">Menu</a>
        <a href="order.php">Order Online</a>
        <a href="contact.php">Contact</a>
        <?php if (!empty($_SESSION['user_id'])): ?>
            <a href="dashboard.php">Dashboard</a>
            <a href="logout.php">Logout</a>
        <?php else: ?>
            <a href="login.php">Login</a>
            <a href="register.php">Register</a>
        <?php endif; ?>
    </nav>
</header>
<main>
