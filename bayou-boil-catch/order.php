<?php
require 'includes/header.php';
require 'config/db.php';
?>
<section class="section">
    <h1>Order Online</h1>
    <p>Select your favorite boils and complete your order.</p>
</section>

<section class="order-section">
    <div class="order-grid">
        <div class="order-item">
            <h3>Shrimp Bayou Boil</h3>
            <span>$18.99</span>
            <button class="btn-primary" data-item="Shrimp Bayou Boil" data-price="18.99">Add to Cart</button>
        </div>
        <div class="order-item">
            <h3>Crab Feast Boil</h3>
            <span>$29.99</span>
            <button class="btn-primary" data-item="Crab Feast Boil" data-price="29.99">Add to Cart</button>
        </div>
        <div class="order-item">
            <h3>Lobster Royale Boil</h3>
            <span>$39.99</span>
            <button class="btn-primary" data-item="Lobster Royale Boil" data-price="39.99">Add to Cart</button>
        </div>
    </div>

    <div class="cart-section">
        <h2>Your Cart</h2>
        <div id="cart-items"></div>
        <p><strong>Total:</strong> $<span id="cart-total">0.00</span></p>

        <form method="POST" action="order.php" class="checkout-form">
            <h3>Checkout</h3>
            <input type="hidden" name="cart_data" id="cart-data">
            <label>Name</label>
            <input type="text" name="customer_name" required>
            <label>Email</label>
            <input type="email" name="customer_email" required>
            <label>Phone</label>
            <input type="text" name="customer_phone" required>
            <label>Notes</label>
            <textarea name="notes"></textarea>
            <button type="submit" class="btn-primary">Place Order</button>
        </form>
    </div>
</section>

<script src="assets/js/cart.js"></script>
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['customer_name'];
    $email = $_POST['customer_email'];
    $phone = $_POST['customer_phone'];
    $notes = $_POST['notes'];
    $cartJson = $_POST['cart_data'];

    $stmt = $conn->prepare("INSERT INTO orders (customer_name, customer_email, customer_phone, notes, cart_json) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $phone, $notes, $cartJson);
    $stmt->execute();
    echo "<p class='success'>Order placed successfully!</p>";
}
require 'includes/footer.php';
?>
