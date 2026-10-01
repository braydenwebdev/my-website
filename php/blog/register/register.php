<?php

if (isset($_POST['register'])) {
    $username = trim($_POST['username']);
    $password = trim($_POST['pwd']);
    $retyped = trim($_POST['conf_pwd']);
    require_once('../../includes/register_user_mysqli.php');
}

# The header section of the layout.
include("../../includes/header.php");
?>

<main>
    <h2><?php echo $folder_name; ?><span><?php echo $file_name; ?></span></h2>
    <?php
    if (isset($success)) {
        echo "<p class=\"info\">$success</p>";
    } elseif (isset($errors) && !empty($errors)) {
        echo '<ul class="feedback">';
        foreach ($errors as $error) {
            echo "<li class=\"error\">$error</li>";
        }
        echo '</ul>';
    }
    ?>
    <form id="form1" method="post" novalidate>
        <fieldset>
            <legend><?php echo $file_name; ?></legend>
            <ol>
                <li>
                    <label for="username">Username:</label>
                    <input type="text" name="username" id="username" required>
                </li>
                <li>
                    <label for="pwd">Password:</label>
                    <input type="password" name="pwd" id="pwd" required>
                </li>
                <li>
                    <label for="conf_pwd">Confirm password:</label>
                    <input type="password" name="conf_pwd" id="conf_pwd" required>
                </li>
                <li>
                    <input name="register" type="submit" id="register" value="Register">
                </li>
            </ol>
        </fieldset>
    </form>
</main>
<?php
# The side-bar section of the layout use custom path to load from a different folder.
include("../sidebar.php");

# The footer section of the layout.
include("../../includes/footer.php");
?>