<?php
session_start();
?>
<?php
// run this script only if the logout button has been clicked
if (isset($_POST['logout'])) {
  // empty the $_SESSION array
  $_SESSION = [];
  // invalidate the session cookie
  if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 86400, '/');
  }
  // end session and redirect
  session_destroy();

  header('Location: /php/blog/admin/blog-login.php');
  exit;
}
?>
<form id="logoutForm" method="post">
  <label style="display: inline-block"><?= ucwords(htmlspecialchars(trim($_SESSION['authenticated']), ENT_QUOTES, 'UTF-8')) ?></label>
  <input name="logout" type="submit" id="logout" value="Log out">
</form>