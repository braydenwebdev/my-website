<?php
include("../includes/header.php");
?>
<main>
    <h2><?= $folder_name; ?>
        <span><?= $file_name; ?></span>
    </h2>

  <h1>MySQL Relational Database Documentation</h1>

  <h2>MySQL Documentation</h2>
  <p>
    MySQL is a powerful open-source Relational Database Management System, developed by Oracle  It is widely used for web applications, especially in Linux, Apache, MySQL, PHP. 
    <a href="https://dev.mysql.com/doc/refman/8.4/en/" target="_blank">MySQL 8.4 Reference Manual</a>.
  </p>

  <h2>MySQL vs Other Databases</h2>
  <p>
    MySQL shares many core features with other RDBMSs like PostgreSQL, Microsoft SQL Server, and Oracle Database. All of them use SQL for querying and managing data. MySQL is known for its simplicity, speed, and ease of deployment, making it ideal for read heavy web applications. 
    Compared to PostgreSQL, which excels in complex queries and data integrity, MySQL offers faster performance in simpler workloads. Unlike proprietary systems like Oracle and SQL Server, MySQL is open-source and free to use, with commercial support available from Oracle.
  </p>

  <h2>Usage of MySQL Worldwide</h2>
  <p>
    MySQL is one of the most widely adopted databases globally. Its lightweight architecture, cross-platform compatibility, and strong community support contribute to its widespread use in startups, enterprises, and cloud environments.
  </p>

  <h2>Summary of the Documentation</h2>
  <p>
    MySQL is a robust, scalable, and user-friendly RDBMS that powers millions of applications worldwide. It stands out for its open-source nature, strong performance in web environments, and broad compatibility with development tools. Whether you're building a small project or a large-scale enterprise system, MySQL offers the flexibility and reliability needed to manage relational data effectively.
  </p>
</main>
<?php
include("../includes/sidebar.php");
include("../includes/footer.php");
?>