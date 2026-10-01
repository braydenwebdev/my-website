<?php
include("../includes/header.php");
?>
<body>
<main>
    <h2><?= $folder_name; ?>
        <span><?= $file_name; ?></span>
    </h2>
<body>
    <h1>PHP Magic Constants</h1>
    <p>Magic constants are special identifiers that expand to context aware values (like the current line, file, or function). They are case insensitive, and their values depend on where they appear in your code.</p>

    <h2>__LINE__</h2>
    <p>Returns the current line number in the file where it appears.</p>
    <pre><code>
<?php
echo "__LINE__ (here): " . __LINE__ . "<br>";

function showLineDemo() {
    echo "Inside function, __LINE__: " . __LINE__ . "<br>";
}
showLineDemo();

echo "Another __LINE__: " . __LINE__ . "<br>";
?>
    </code></pre>

    <h2>__FILE__</h2>
    <p>Expands to the full path and filename of the current file.</p>
    <pre><code>
<?php
echo "__FILE__: " . __FILE__ . "<br>";
?>
    </code></pre>

    <h2>__DIR__</h2>
    <p>Expands to the directory of the current file.</p>
    <pre><code>
<?php
echo "__DIR__: " . __DIR__ . "<br>";
$pathToConfig = __DIR__ . DIRECTORY_SEPARATOR . "02.magic-constants.php";
echo "Joined path: " . $pathToConfig . "<br>";
?>
    </code></pre>

    <h2>__FUNCTION__</h2>
    <p>Inside a function, expands to that function’s name.</p>
    <pre><code>
<?php
function greet() {
    echo "__FUNCTION__ in named function: " . __FUNCTION__ . "<br>";
}
greet();

$anon = function () {
    echo "__FUNCTION__ in anonymous function: " . __FUNCTION__ . "<br>";
};
$anon();
?>
    </code></pre>

    <h2>Resources</h2>
    <ul>
        <li><a href="https://www.php.net/manual/en/language.constants.magic.php" target="_blank">PHP Manual — Magic constants</a></li>
        <li><a href="https://www.php.net/manual/en/language.constants.predefined.php" target="_blank">PHP Manual — Predefined constants</a></li>
        <li><a href="https://www.php.net/manual/en/language.constants.php" target="_blank">PHP Manual — Constants (overview)</a></li>
    </ul>
</main>
<?php
include("../includes/sidebar.php");
include("../includes/footer.php");
?>
</body>