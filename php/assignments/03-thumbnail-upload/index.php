<?php

use php\PhpSolutions\Image\ThumbnailUpload;

// set the maximum width or height size
$maxSize = 300; // no units PX expected

// set the maximum upload size in bytes
$size = 2048000; // 2048000/1024/1000 = 2MB


if (isset($_POST['upload'])) {
    require_once('../../PhpSolutions/Image/ThumbnailUpload.php');
    try {
        // Call __construct($path, $deleteOriginal = false)
        $loader = new ThumbnailUpload('images/', false);
        
        // Call setThumbOptions($path, $maxSize = null, $suffix = null)
        $loader->setThumbOptions('images/', $maxSize, 'small');
        
        // Call public function upload($fieldname, $size = null, ?array $mime = null, $renameDuplicates = true)
        $loader->upload('image', $size);
        
        $messages = $loader->getMessages();
    } catch (Throwable $t) {
        $loader_exception_message = $t->getMessage();
    }
}

$tools = true;
# The header section of the layout.
include("../../includes/header.php");
?>

        <main>
            <h2><?php echo $folder_name; ?><span><?php echo $file_name; ?></span></h2>
            <p><a href="images" accesskey="i">View Images</a></p>
            <p><button id="images-delete">Delete Images</button></p>

            <?php

            if(isset($loader_exception_message)) {
                echo '<h2 class="error">&nbsp;⚙︎ Error</h2>';
                echo "<ul>";
                    echo "<li>$loader_exception_message</li>";
                echo "</ul>";
            }

            if (isset($messages) && !empty($messages)) {
              echo '<h2 class="error">&nbsp;⚙︎ Messages</h2>';
              echo '<ul>';
              foreach ($messages as $message) {
                echo "<li>$message</li>";
              }
              echo '</ul>';
            }
            ?>

            <form method="post" enctype="multipart/form-data" id="uploadImage">
                <fieldset>
                    <legend><?php echo $file_name; ?></legend>
                    <ol>
                        <li>
                            <label for="image">Upload images (multiple selections permitted):</label>
                            <input type="hidden" name="MAX_FILE_SIZE" value="2048000">
                            <input type="file" name="image[]" id="image" multiple>
                          </li>
                          <li>
                            <input type="submit" name="upload" id="upload" value="Upload">
                          </li>
                    </ol>
                </fieldset>

            </form>
        </main>
<?php
# The side-bar section of the layout use custom path to load from a different folder.
include("../../includes/sidebar.php");

$js = '<script type="module" src="/php/js-custom/images-delete.js"></script>';
# The footer section of the layout.
include("../../includes/footer.php");
?>