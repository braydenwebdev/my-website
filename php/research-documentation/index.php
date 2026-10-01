<?php
include("../includes/header.php");
?>
<main>
    <h2><?= $folder_name; ?>
        <span><?= $file_name; ?></span>
    </h2>
    <h2>Research Documentation</h2>
    <nav>
    <ul><li><a href="/php/research-documentation/01.php-history.php">01 PHP History</a></li></ul>
    <ul><li><a href="/php/research-documentation/02.magic-constants.php">02 Magic Constants</a></li></ul>
    <ul><li><a href="/php/research-documentation/03.local-php.php">03 Local PHP</a></li></ul>
    <ul><li><a href="/php/research-documentation/04.MySQL.php">04 MySQL</a></li></ul>
    <ul><li><a href="/php/research-documentation/05.PHP-8.php">05 PHP 8</a></li></ul>
    <ul><li><a href="/php/research-documentation/06.PHP-Frameworks.php">06 PHP Frameworks</a></li></ul>
    <nav>
</main>
<?php
include("../includes/sidebar.php");
include("../includes/footer.php");
?>