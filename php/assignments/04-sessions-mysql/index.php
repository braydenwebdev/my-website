<?php
include("../../includes/header.php");
?>
<main>
    <h2><?= $folder_name; ?>
        <span><?= $file_name; ?></span>
    </h2>
    <h2>Assignments</h2>
    <nav>
        <ul>
            <li><a href="/php/assignments/04-sessions-mysql/01-register.php">Register</a></li>
            <li><a href="/php/assignments/04-sessions-mysql/02-login.php">Login</a></li>
            <li><a href="/php/assignments/04-sessions-mysql/02-menu.php">Menu</a></li>
            <li><a href="/php/assignments/04-sessions-mysql/02-secretpage.php">Secret Page</a></li>
            <li><a href="/php/assignments/04-sessions-mysql/2.03-mysqli_integer_03.php">Pictures</a></li>
            
        
        </ul>
    </nav>
</main>
<?php
include("../../includes/sidebar.php");
include("../../includes/footer.php");
?>