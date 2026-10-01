<?php
include("../includes/header.php");
?>
<main>
    <h2><?= $folder_name; ?>
        <span><?= $file_name; ?></span>
    </h2>
<h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <p>It might have been moved, deleted, or never existed at all.</p>
</main>
<?php
include("../includes/sidebar.php");
include("../includes/footer.php");
?>