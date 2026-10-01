<?php
include("../../includes/header.php");
?>
<main>
    <h2><?= $folder_name; ?>
        <span><?= $file_name; ?></span>
    </h2>
<h2>Admin</h2>
    <nav>
        <ul>
            <li><a href="/php/blog/admin/blog-delete.php">Delete</a></li>
            <li><a href="/php/blog/admin/blog-insert/php">Insert</a></li>
            <li><a href="/php/blog/admin/blog-list.php">List</a></li>
            <li><a href="/php/blog/admin/blog-login.php">Login</a></li>
            <li><a href="/php/blog/admin/blog-update.php">Update</a></li>
            <li><a href="/php/blog/register/register.php">Register</a></li>
        </ul>
    </nav>
</main>
<?php
include("../../includes/sidebar.php");
include("../../includes/footer.php");
?>