<?php
include("../includes/header.php");
?>
<main>
    <h2><?= $folder_name; ?>
        <span><?= $file_name; ?></span>
    </h2>

    <h1>PHP Frameworks Documentation</h1>

  <h2>Laravel</h2>
  <p>
    Laravel is the most popular PHP framework in 2025, known for its elegant syntax and robust ecosystem. It supports MVC architecture and includes features like Eloquent ORM, Blade templating, and Artisan CLI. Laravel is actively maintained and used by companies like Pfizer and BBC. 
    <a href="https://laravel.com" target="_blank">Visit Laravel Website</a>
  </p>

  <h2>Symfony</h2>
  <p>
    Symfony is a modular framework ideal for enterprise level applications. It offers reusable components, strong scalability, and is used by platforms like Drupal and eZ Publish. Symfony powers parts of Laravel and is maintained by SensioLabs.
    <a href="https://symfony.com" target="_blank">Visit Symfony Website</a>
  </p>

  <h2>CodeIgniter</h2>
  <p>
    CodeIgniter is a lightweight PHP framework known for its speed and simplicity. It’s ideal for small to medium-sized projects and has a gentle learning curve. Though it has less features than Laravel or Symfony, it remains popular for rapid development.
    <a href="https://codeigniter.com" target="_blank">Visit CodeIgniter Website</a>
  </p>

  <h2>Summary</h2>
  <p>
    This documentation highlights three leading PHP frameworks Laravel, Symfony, and CodeIgniter each offering unique strengths for different project needs. Laravel leads in popularity and features, Symfony excels in modularity and scalability, and CodeIgniter offers speed and simplicity for lightweight applications.
  </p>


</main>
<?php
include("../includes/sidebar.php");
include("../includes/footer.php");
?>