<?php
include("../includes/header.php");
?>
<main>
    <h2><?= $folder_name; ?>
        <span><?= $file_name; ?></span>
    </h2>
    <h2>Assignments</h2>
    <nav>
        <ul>
            <li><a href="/php/assignments/01-includes/index.php">01 Includes</a></li>
            <li><a href="/php/assignments/02-mail/index.php">02 Mail</a></li>
            <li><a href="/php/assignments/03-thumbnail-upload/index.php">03 Thumbnail Upload</a></li>
            <li><a href="/php/assignments/04-sessions-mysql/index.php">04 Sessions & MySQL</a></li>
        </ul>
    </nav>
</main>
<?php
include("../includes/sidebar.php");
include("../includes/footer.php");
?>