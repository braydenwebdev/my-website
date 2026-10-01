<?php
$error = '';
if (isset($_POST['login'])) {
    session_start();
    $username = trim($_POST['username']);
    $password = trim($_POST['pwd']);
    // location of usernames and passwords
    $userlist = 'encrypted.csv';
    // location to redirect on success
    $redirect = '/php/assignments/04-sessions-mysql/04-menu-04.php';
    require_once('../../includes/authenticate.php');
}

$tools = true;
include("../../includes/header.php");
?>

<main>
    <h2><?php echo $folder_name; ?><span><?php echo $file_name; ?></span></h2>
    <?php
    if ($error) {
        echo "<p class=\"error\">$error</p>";
    } elseif (isset($_GET['expired'])) {
    ?>
        <p>Your session has expired. Please log in again.</p>
    <?php } ?>
    <form id="form1" method="post">
        <fieldset>
            <legend>Login</legend>
            <ol>
                <li>
                    <label for="username">Username:</label>
                    <input type="text" name="username" id="username">
                </li>
                <li>
                    <label for="pwd">Password:</label>
                    <input type="password" name="pwd" id="pwd">
                </li>
                <li>
                    <input name="login" type="submit" id="login" value="Log in">
                </li>
            </ol>

        </fieldset>

    </form>
</main>
<?php
# The side-bar section of the layout use custom path to load from a different folder.
include("../../includes/sidebar.php");

# The footer section of the layout.
include("../../includes/footer.php");
?>