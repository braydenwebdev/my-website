<?php
// Database Connection
require_once('../../includes/connection.php');

// Utility Functions
require_once '../../includes/utility_funcs.php';

// Connect to Database Using MySQL
$conn = dbConnect('read');

// Prepare the SQL query
$getImages = 'SELECT image_id, filename 
FROM php_a04_images
';

// Submit the Query and Capture the Result
$images = $conn->query($getImages);

// Check For Database Errors
if (!$images) {
    $error = $conn->error;
} else {
    $numRows = $images->num_rows;
}

$tools = true;
include("../../includes/header.php");
?>

<main>
    <h2><?php echo $folder_name; ?><span><?php echo $file_name; ?></span></h2>

    <?php
    if (isset($error)) {
        echo "<p class=\"error\">$error</p>";
    } else {
        echo "<p class=\"info\">A total of $numRows records were found.</p>";
    }
    ?>

    <figure class="code">
        <pre class="language-sql"><code><?= $getImages ?></code></pre>
    </figure>

    <form method="get" id="form1">
        <fieldset>
            <legend><?php echo $file_name; ?></legend>
            <ol>
                <li>
                    <select name="image_id" id="image_id">
                        <?php
                        while ($row = $images->fetch_assoc()) {
                        ?>
                            <option value="<?php echo $row['image_id']; ?>"
                                <?php
                                if (isset($_GET['image_id']) && $_GET['image_id'] == $row['image_id']) {
                                    echo ' selected';
                                } ?>>
                                <?php echo safe($row['filename']); ?>
                            </option>
                        <?php } // END while 
                        ?>

                    </select>
                </li>
                <li>
                    <input type="submit" name="go" id="go" value="Display">
                </li>
            </ol>
        </fieldset>
    </form>


    <?php
    if (isset($_GET['image_id'])) {

        if (!is_numeric($_GET['image_id'])) {
            $image_id = 1;
        } else {
            $image_id = (int) $_GET['image_id'];
        }
        $sql = "SELECT 
filename, 
caption 
FROM php_a04_images  
WHERE image_id = $image_id";

        $result = $conn->query($sql);
        if ($result->num_rows) {
            $row = $result->fetch_assoc();
    ?>
            <figure class="code">
                <pre class="language-sql"><code><?= $sql ?></code></pre>
            </figure>
            <figure>
                <img src="images/<?php echo $row['filename']; ?>">
                <figcaption><?php echo $row['caption']; ?></figcaption>
            </figure>
        <?php } else { ?>
            <figure class="code">
                <pre class="language-sql"><code><?= $sql ?></code></pre>
            </figure>
            <figure>

                <figcaption>Image Not Found</figcaption>
            </figure>
        <?php } // END if $result->num_rows 
        ?>



    <?php } // END if (isset($_GET['image_id'])) 
    ?>
</main>
<?php
# The side-bar section of the layout use custom path to load from a different folder.
include("../../includes/sidebar.php");

# The footer section of the layout.
include("../../includes/footer.php");
?>