<?php
include("../includes/header.php");
?>
<main>
    <h2><?= $folder_name; ?>
        <span><?= $file_name; ?></span>
    </h2>

    <h1>PHP 8 Documentation</h1>

    <h2>Feature 1: Pipe Operator (|>)</h2>
    <p>PHP 8 introduces the pipe operator, allowing developers to chain function calls in a readable left toright format. This simplifies nested function calls and improves code clarity. Example: <code>$result = 'Hello' |> strtoupper |> trim;</code></p>

    <h2>Feature 2: array_first() and array_last()</h2>
    <p>Two new functions, <code>array_first()</code> and <code>array_last()</code>, make it easier to retrieve the first and last elements of an array.</p>

    <h2>Feature 3: get_error_handler() and get_exception_handler()</h2>
    <p>PHP 8 adds new functions to retrieve the currently active error and exception handlers. These are useful for debugging and customizing error management in complex applications.</p>

    <h2>Summary</h2>
    <p>PHP 8 continues to enhance developer experience with new syntax features, utility functions, and debugging tools. The pipe operator streamlines function chaining, array helpers simplify data access, and new handler functions improve error visibility.</p>
  

</main>
<?php
include("../includes/sidebar.php");
include("../includes/footer.php");
?>