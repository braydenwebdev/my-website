<?php
require_once '../includes/connection.php';
require_once '../includes/utility_funcs.php';

// Connect to the database
$conn = dbConnect('read');

// Get article_id from query string
$article_id = isset($_GET['article_id']) && is_numeric($_GET['article_id']) ? (int) $_GET['article_id'] : 0;

// Query the article and image data
$sql = "SELECT
            title,
            article,
            DATE_FORMAT(updated, '%W, %M %D, %Y') AS updated,
            filename,
            caption
        FROM php_blog_pages
        LEFT JOIN php_blog_images USING (image_id)
        WHERE php_blog_pages.article_id = $article_id";

$result = $conn->query($sql);
$row = $result ? $result->fetch_assoc() : null;

// Prepare image if available
$imageDir = './images/';
$image = '';
$imageSize = '';
if ($row && !empty($row['filename'])) {
    $image = $imageDir . basename($row['filename']);
    if (file_exists($image) && is_readable($image)) {
        $imageSize = getimagesize($image)[3]; // width="..." height="..."
    }
}

// Include layout header
include("../includes/header.php");
?>

<main>
    <h2>
        <?php if ($row): ?>
            <?= safe($row['title']) ?>
            <span><?= $row['updated'] ?></span>
        <?php else: ?>
            No record found
        <?php endif; ?>
    </h2>

    <?php if (!empty($imageSize)): ?>
        <figure>
            <img src="<?= $image ?>" alt="<?= safe($row['caption']) ?>" <?= $imageSize ?>>
            <figcaption><?= safe($row['caption']) ?></figcaption>
        </figure>
    <?php endif; ?>

    <?php if ($row): ?>
        <?= convertToParas($row['article']) ?>
    <?php endif; ?>

    <h2>Debug Code</h2>
    <pre class="line-numbers"><code class="language-php">
<?php
print_r($row);
if (!empty($image)) {
    print_r(getimagesize($image));
}
?>
    </code></pre>
</main>

<?php
include("sidebar.php");
include("../includes/footer.php");
?>