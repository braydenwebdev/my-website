<?php


# Source: ch15/blog_list_norec_mysqli.php

require_once '../../includes/session_timeout_db.php';
require_once '../../includes/connection.php';
require_once '../../includes/utility_funcs.php';

// create database connection
$conn = dbConnect('read');

$sql = 'SELECT *,
            DATE_FORMAT(created, "%a, %b %D, %Y") AS created
            FROM php_blog_pages ORDER BY created DESC';

$result = $conn->query($sql);

if (!$result) {
  $error = $conn->error;
} else {
  ###################################
  # Get the number of records found #
  ###################################
  $numRows = $result->num_rows;
}

# Robert's Custom Variable (Do Not Use)
$tools = true;

# The header section of the layout.
include("../../includes/header.php");
?>
<main>
  <h2><?php echo $folder_name; ?><span><?php echo $file_name; ?></span></h2>
  <p><a href="blog-page-insert.php">Insert new entry</a></p>

  <?php
  #######################################
  # Display message if no records found #
  #######################################
  if ($numRows == 0) {
  ?>
    <p class="info">No records found</p>
  <?php
    ##################################
    # Otherwise, display the results #
    ##################################
  } else {
    if (isset($_GET['updated'])) {
      echo '<p class="info">Record updated</p>';
    }
  ?>
    <table>
      <tr>
        <th scope="col">Created</th>
        <th scope="col">Title</th>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
      </tr>
      <?php while ($row = $result->fetch_assoc()) { ?>
        <tr>
          <td><?= $row['created']; ?></td>
          <td><?= safe($row['title']); ?></td>
          <td>
        <?php 
            if($row['article_id'] == 30 && $_SESSION['authenticated'] != 'robert9999') { 
                echo '⛔️'; 
            } else { ?>
                <a href="blog-page-update.php?article_id=<?= $row['article_id']; ?>">EDIT</a> 
        <?php } ?>
    </td>
    <td>
        <?php 
            if($row['article_id'] == 30 && $_SESSION['authenticated'] != 'robert9999') { 
                echo '⛔️'; 
            } else { ?>
                <a href="blog-page-delete.php?article_id=<?= $row['article_id']; ?>">DELETE</a> 
        <?php } ?>
    </td>        </tr>
      <?php } ?>
    </table>
  <?php
    ####################################################
    # Close the else clause wrapping the results table #
    ####################################################
  }
  ?>


  <h2>Debug</h2>
  <pre class="line-numbers">
<code class="language-php">
<?php
print_r($_SESSION);
?>
</code>
</pre>

  <?php include('../../includes/logout_db.php'); ?>
</main>

<?php
# The side-bar section of the layout use custom path to load from a different folder.
include("../about-us/sidebar.php");

# The footer section of the layout.
include("../../includes/footer.php");
?>