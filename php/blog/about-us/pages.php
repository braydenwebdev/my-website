<?php
require_once '../../includes/connection.php';
require_once '../../includes/utility_funcs.php';

// Create database connection
$conn = dbConnect('read');

    

// SQL query to fetch articles and associated images
$sql = "SELECT
            article_id,
            image_id,
            title, 
            article, 
            DATE_FORMAT(created, '%W, %M %D, %Y') AS created_date, 
            filename, 
            caption
        FROM php_blog_pages
        LEFT JOIN php_blog_images USING (image_id)
        ORDER BY created DESC";

$result = $conn->query($sql);
if (!$result) {
    $error = $conn->error;
}

// Custom variable
$tools = true;

// Header section
include("../../includes/header.php");
?>

<main>
    <h2><?php echo $folder_name; ?><span><?php echo $file_name; ?></span></h2>

    <?php if (isset($error)) {
        echo "<p>$error</p>";
    } else {
        while ($row = $result->fetch_assoc()) {
            echo "<h2 class=\"clear\">" . safe($row['title']) . "<span>{$row['created_date']}</span></h2>";

            // Display image if available
            if (!empty($row['filename'])) {
                echo '<img src="/php/blog/images/thumbs/' . safe($row['filename']) . '" alt="' . safe($row['caption']) . '">';
            }

            // Extract first paragraph(s) from article
            if ($row) {
                $extract = getFirst($row['article']);
                echo '<p>' . safe($extract[0]);

                // Only show "Read More" link if second paragraph exists
                if (isset($extract[1])) {
                    echo '<a href="details.php?article_id=' . $row['article_id'] . '">Read More&hellip;</a>';
                }

                echo '</p>';
            }
        }
    }
    ?>
</main>

<?php
// Sidebar and footer
include("sidebar.php");
include("../../includes/footer.php");
?>