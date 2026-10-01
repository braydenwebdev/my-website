<?php
declare(strict_types=1);

/**
 * Utility functions for data sanitization and formatting.
 * Location: php/includes/utility_funcs.php
 */

/**
 * Sanitize output from the database using htmlspecialchars.
 *
 * @param string|null $data Raw data from the database.
 * @return string Sanitized string safe for HTML output.
 */
function safe(?string $data): string {
    return htmlspecialchars($data ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function getFirst($text, $numSentences = 1) {
    $sentences = preg_split('/(?<=[.?!])\s+/', trim($text));
    return implode(' ', array_slice($sentences, 0, $numSentences));
}

function convertToParas($text) {
    $paras = explode("\n", trim($text));
    $html = '';
    foreach ($paras as $para) {
        if (trim($para) !== '') {
            $html .= '<p>' . htmlspecialchars($para) . '</p>';
        }
    }
    return $html;
}

?>