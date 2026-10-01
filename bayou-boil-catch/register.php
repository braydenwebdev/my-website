<?php
require 'config/db.php';
require 'includes/header.php';

$error = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (username, email, passwordHash) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $password);

    if ($stmt->execute()) {
        header("Location: login.php");
        exit();
    } else {
        $error = "Registration failed.";
    }
}
?>
<section class="auth-section">
    <h1>Register</h1>
    <form method="POST" class="auth-form">
        <label>Username</label>
        <input type="text" name="username" required>
        <label>Email</label>
        <input type="email" name="email" required>
        <label>Password</label>
        <input type="password" name="password" required>
        <button type="submit" class="btn-primary">Create Account</button>
        <?php if (!empty($error)) echo "<p class='error'>$error</p>"; ?>
    </form>
</section>
<?php require 'includes/footer.php'; ?>
