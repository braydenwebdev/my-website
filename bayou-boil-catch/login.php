<?php
require 'config/db.php';
require 'includes/header.php';

$error = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user["passwordHash"])) {
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["username"] = $user["username"];
            header("Location: dashboard.php");
            exit();
        }
    }
    $error = "Invalid username or password.";
}
?>
<section class="auth-section">
    <h1>Login</h1>
    <form method="POST" class="auth-form">
        <label>Username</label>
        <input type="text" name="username" required>
        <label>Password</label>
        <input type="password" name="password" required>
        <button type="submit" class="btn-primary">Login</button>
        <?php if (!empty($error)) echo "<p class='error'>$error</p>"; ?>
    </form>
</section>
<?php require 'includes/footer.php'; ?>
