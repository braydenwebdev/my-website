<?php
ini_set("date.timezone", "America/Chicago");

/**
 * Create human-friendly folder and file names.
 * @param string $string The string to humanize.
 * @return string The humanized string.
 */
function humanize($string) {
    $string = str_replace("-", " ", $string);
    if ($string == "php") {
        $string = strtoupper($string);
    } elseif ($string == "research documentation") {
        $string = "Research & Documentation";
    } elseif ($string == "index") {
        $string = "Home";
    } else {
        $string = ucwords($string);
    }
    return $string;
}

$working_directory = getcwd();
$folder_name = basename($working_directory);
$file_name = basename($_SERVER['PHP_SELF'], ".php");

$folder_name = humanize($folder_name);
$file_name = humanize($file_name);

?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title><?php if (isset($file_name)) echo "$file_name - "; ?><?php if (isset($folder_name)) echo "$folder_name - "; ?>PHP <?php echo date("Y"); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/php/css/style.css">
    <link rel="icon" href="/php/css/assets/images/icon-favicon.png">
    <link rel="apple-touch-icon" href="/php/css/assets/images/icon-apple.png">
    <script defer src="/php/js/prism.js"></script>
    <script defer src="/php/js/index.js"></script>
    <?php if (isset($js_head)) echo $js_head; ?>

</head>

<body>
    <div class=" wrapper">

        <header>
            <a href="/php">
                <h1>
                    <?= $folder_name ?>
                    <span><?= $file_name ?></span>
                </h1>
            </a>
            <svg>
                <use href="/php/css/assets/images/sprite.svg#logo-php" />
            </svg>
        </header>

        <nav class="nav-main">
            <button class="nav-main-menu-toggle" aria-label="Open Menu" aria-controls="nav-main-menu" aria-expanded="false">
                <svg viewBox="0 0 48 48" width="48" height="48">
                    <rect x="6" y="12" width="36" height="4" rx="2"></rect>
                    <rect x="6" y="22" width="36" height="4" rx="2"></rect>
                    <rect x="6" y="32" width="36" height="4" rx="2"></rect>
                </svg>
            </button>
            <ul id="nav-main-menu" hidden>
                <li><a <?php if (basename($working_directory) == "php") echo " class=\"current-page\""; ?> href="/php">Home</a></li>
                <li><a <?php if (basename($working_directory) == "assignments") echo " class=\"current-page\""; ?> href="/php/assignments">Assignments</a></li>
                <li><a <?php if (basename($working_directory) == "research-documentation") echo " class=\"current-page\""; ?> href="/php/research-documentation">R&amp;D</a></li>
                <li><a <?php if (basename($working_directory) == "blog") echo " class=\"current-page\""; ?> href="/php/blog/">Blog</a></li>
                <li>
                    <form action="//php.net/search.php">
                        <input name="pattern" placeholder="Search php.net" autocomplete="off" accesskey="p">
                    </form>
                </li>
            </ul>
        </nav>