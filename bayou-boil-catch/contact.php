<?php require 'includes/header.php'; ?>
<section class="contact-section">
    <h1>Contact Us</h1>
    <div class="contact-grid">
        <form class="contact-form" method="POST" action="contact.php">
            <label>Name</label>
            <input type="text" name="name" required>
            <label>Email</label>
            <input type="email" name="email" required>
            <label>Message</label>
            <textarea name="message" required></textarea>
            <button class="btn-primary" type="submit">Send Message</button>
        </form>
        <div class="contact-info">
            <p><strong>Address:</strong> 123 Harbor Street, Green Bay, WI</p>
            <p><strong>Hours:</strong> Mon–Sun: 11am – 10pm</p>
            <p><strong>Phone:</strong> (920) 555-1234</p>
        </div>
    </div>
</section>
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "<p class='success'>Thank you for contacting us. We’ll get back to you soon.</p>";
}
require 'includes/footer.php';
?>
