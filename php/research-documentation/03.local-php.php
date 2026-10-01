<?php
include("../includes/header.php");
?>
<main>
    <h2><?= $folder_name; ?>
        <span><?= $file_name; ?></span>
    </h2>
<h1>Local PHP</h1>
<h2>XAMPP</h2>
<p>Pros of using XAMPP is that its a quick setup with everything bundled together. Its also great for beginners. Cons is that it has limited flexibility for custom server configurations.</p>
<h2>Installing PHP manually + Command line Execution</h2>
<p>Pros of doing this is that its fast. Its ideal for CLI scripts or and automation tasks. And you have full control over PHP version and extensions. The cons is that theres no built in web server unless configured separately. As well as it not being suitable for testing browser based output without extra setup.</p>
<h2>Using Built in PHP Development Server</h2>
<p>Pros are fast and minimal setup, ideal for small projects or demos. The cons are that its not recommended for production, and it has limited configuration options compared to Apache or Nginx.</p>
<h2>Summary</h2>
<p>Pros: Full control over environment, no internet required for development, easier debugging and testing, faster iteration and experimentation.</p>
<br>
<p>Cons: Possible differ from live server setup, requires manual configurations and updates, potential security risks if misconfigured, can be resource heavy depending on setup.</p>
</main>
<?php
include("../includes/sidebar.php");
include("../includes/footer.php");
?>