<?php
# Include the Google reCAPTCHA Library
require_once('../../includes/google-recaptcha-library.php');
$g_recaptcha_key_site = '6Lc9Jb0rAAAAAJ0fARM84dAd0S0HbzkQM8tWKn2k';
$g_recaptcha_key_secret = '6Lc9Jb0rAAAAAF-u48BapHYZlKtSlOrRA3np9E4r';
# Add Google reCAPTCHA JavaScript to HTML HEAD
$js_head = '<script src="https://www.google.com/recaptcha/api.js"></script>';

$errors = [];
$missing = [];
// check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // email processing script
    $to = 'robert@nwtc-web.com';  // use your own email address
    $subject = 'Feedback from Green Bay Journey';
    // list expected fields
    $expected = ['name', 'email', 'comments', 'subscribe', 'interests', 'howhear', 'characteristics', 'terms'];
    $required = ['name', 'email', 'comments', 'subscribe', 'interests', 'howhear', 'characteristics', 'terms'];
    // set default values for variables that might not exist
    if (!isset($_POST['subscribe'])) {
        $_POST['subscribe'] = '';
    }
    if (!isset($_POST['interests'])) {
        $_POST['interests'] = array();
    }
    if (!isset($_POST['characteristics'])) {
        $_POST['characteristics'] = array();
    }
    if (!isset($_POST['terms'])) {
        $_POST['terms'] = '';
        $errors['terms'] = true;
    }
    // minimum number of required check boxes
    $minCheckboxes = 2;
    if (count($_POST['interests']) < $minCheckboxes) {
        $errors['interests'] = true;
    }
    // minimum number of required list items
    $minList = 2;
    if (count($_POST['characteristics']) < $minList) {
        $errors['characteristics'] = true;
    }
    // create additional headers
    $headers[] = 'From: Green Bay Journey<brayden.urmanski@mymail.nwtc.edu>';
    $headers[] = 'Content-Type: text/plain; charset=utf-8';

    // Place results of g_recaptcha_request() in $g_recaptcha_response
    $g_recaptcha_response = g_recaptcha_request();
    if (!$g_recaptcha_response->success) {
        $errors['recaptcha'] = true;
    }





    # Not loading via include - showing here for demo only...
    // require('processmail_05.php');
    // pattern to locate suspect phrases
    $pattern = '/[\s\r\n]|Content-Type:|Bcc:|Cc:/i';
    // check the submitted email address
    $suspect = preg_match($pattern, $_POST['email']);

    if (!$suspect) {
        foreach ($_POST as $key => $value) {
            // strip whitespace from $value if not an array
            if (!is_array($value)) {
                $value = trim($value);
            }
            if (!in_array($key, $expected)) {
                // ignore the value, it's not in $expected
                continue;
            }
            if (in_array($key, $required) && empty($value)) {
                // required value is missing
                $missing[] = $key;
                $$key = "";
                continue;
            }
            $$key = $value;
        }
    }
    // validate the user's email
    if (!$suspect && !empty($email)) {
        $validemail = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        if ($validemail) {
            $headers[] = "Reply-To: $validemail";
        } else {
            $errors['email'] = true;
        }
    }
    $mailSent = false;
    // go ahead only if not suspect, all required fields OK, and no errors
    if (!$suspect && !$missing && !$errors) {
        // initialize the $message variable
        $message = '';
        // loop through the $expected array
        foreach ($expected as $item) {
            // assign the value of the current item to $val
            if (isset($$item) && !empty($$item)) {
                $val = $$item;
            } else {
                // if it has no value, assign 'Not selected'
                $val = 'Not selected';
            }
            // if an array, expand as comma-separated string
            if (is_array($val)) {
                $val = implode(', ', $val);
            }
            // replace underscores in the label with spaces
            $item = str_replace('_', ' ', $item);
            // add label and value to the message body
            $message .= ucfirst($item) . ": $val\r\n\r\n";
        }
        // limit line length to 70 characters
        $message = wordwrap($message, 70);
        // format headers as a single string
        $headers = implode("\r\n", $headers);
        $mailSent = mail($to, $subject, $message, $headers);
        if (!$mailSent) {
            $errors['mailfail'] = true;
        }
    }

    # END: require('processmail_05.php');

    if ($mailSent) {
        header('Location: thank-you.php');
        exit;
    }
} // close: if (isset($_POST['send']))



# Page specific variables.
$nav = "assignments";
$title_section = "02 Mail";
$tools = true; // Robert's Custom Variable (Do Not Use)

$tools = true;
include("{$_SERVER["DOCUMENT_ROOT"]}/php/includes/header.php");
?>
<main>
    <h2><?= $folder_name; ?>
        <span><?= $file_name; ?></span>
    </h2>
    <?php if ($_POST && $suspect) { ?>
        <p class="error">Sorry, your mail could not be sent. Please try later.</p>
    <?php } elseif ($missing || $errors) { ?>
        <p class="error">Please complete the missing item(s) indicated.</p>
    <?php } ?>
    <form id="feedback" method="post">
        <fieldset>
            <legend><?= $file_name; ?></legend>
            <ol>
                <li<?php if ($missing && in_array('name', $missing)) echo ' class="error"'; ?>>
                    <?php if ($missing && in_array('name', $missing)) { ?>

                        <strong>Please enter your name</strong>
                    <?php } ?>

                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" class="formbox" <?php
                                                                                if (isset($name)) {
                                                                                    echo ' value="' . htmlentities($name) . '"';
                                                                                } ?>>
                    </li>
                    <li<?php if (($missing && in_array('email', $missing)) || (isset($errors['email']))) echo ' class="error"'; ?>>
                        <?php if ($missing && in_array('email', $missing)) { ?>

                            <strong>Please enter your email</strong>
                        <?php } elseif (isset($errors['email'])) { ?>

                            <strong>Invalid email address</strong>
                        <?php } ?>

                        <label for="email">Email:</label>
                        <input name="email" id="email" type="text" class="formbox" <?php
                                                                                    if (isset($email)) {
                                                                                        echo ' value="' . htmlentities($email) . '"';
                                                                                    } ?>>
                        </li>
                        <li<?php if ($missing && in_array('comments', $missing)) echo ' class="error"'; ?>>
                            <?php if ($missing && in_array('comments', $missing)) { ?>

                                <strong>Please enter your comments</strong>
                            <?php } ?>

                            <label for="comments">Comments:</label>
                            <textarea name="comments" id="comments" cols="60" rows="8"><?php
                                                                                        if (isset($comments)) {
                                                                                            echo htmlentities($comments);
                                                                                        } ?></textarea>
                            </li>
                            <li<?php if ($missing && in_array('subscribe', $missing)) echo ' class="error"'; ?>>

                                <?php if ($missing && in_array('subscribe', $missing)) { ?>

                                    <strong>Please make a selection</strong>
                                <?php } ?>

                                <label>Subscribe to Green Bay Mail?</label>
                                <label for="subscribe-yes">
                                    <input name="subscribe" type="radio" value="Yes" id="subscribe-yes" <?php
                                                                                                        if ($_POST && $_POST['subscribe'] == 'Yes') {
                                                                                                            echo ' checked';
                                                                                                        } ?>>
                                    Yes
                                </label>

                                <label for="subscribe-no">
                                    <input name="subscribe" type="radio" value="No" id="subscribe-no" <?php
                                                                                                        if ($_POST && $_POST['subscribe'] == 'No') {
                                                                                                            echo ' checked';
                                                                                                        } ?>>
                                    No
                                </label>
                                </li>
                                <li<?php if (isset($errors['interests'])) echo ' class="error"'; ?>>

                                    <?php if (isset($errors['interests'])) { ?>

                                        <strong>Please select at least <?php echo $minCheckboxes; ?></strong>
                                    <?php } ?>

                                    <label>Interests in Green Bay</label>
                                    <label for="packers">
                                        <input type="checkbox" name="interests[]" value="packers" id="packers" <?php
                                                                                                                    if ($_POST && in_array('packers', $_POST['interests'])) {
                                                                                                                        echo ' checked';
                                                                                                                    } ?>>
                                        Packers
                                    </label>

                                    <label for="BayBeach">
                                        <input type="checkbox" name="interests[]" value="BayBeach" id="BayBeach" <?php
                                                                                                                    if ($_POST && in_array('BayBeach', $_POST['interests'])) {
                                                                                                                        echo ' checked';
                                                                                                                    } ?>>
                                        BayBeach
                                    </label>

                                    <label for="Titletown">
                                        <input type="checkbox" name="interests[]" value="Titletown" id="Titletown" <?php
                                                                                                                        if ($_POST && in_array('Titletown', $_POST['interests'])) {
                                                                                                                            echo ' checked';
                                                                                                                        } ?>>
                                        Titletown
                                    </label>

                                    <label for="Swimming">
                                        <input type="checkbox" name="interests[]" value="Swimming" id="Swimming" <?php
                                                                                                                            if ($_POST && in_array('Swimming', $_POST['interests'])) {
                                                                                                                                echo ' checked';
                                                                                                                            } ?>>
                                        Swimming
                                    </label>

                                    <label for="National Railroad Museum">
                                        <input type="checkbox" name="interests[]" value="National Railroad Museum" id="National Railroad Museum" <?php
                                                                                                                            if ($_POST && in_array('National Railroad Museum', $_POST['interests'])) {
                                                                                                                                echo ' checked';
                                                                                                                            } ?>>
                                        National Railroad Museum
                                    </label>

                                    <label for="Downtown">
                                        <input type="checkbox" name="interests[]" value="Downtown" id="Downtown" <?php
                                                                                                                if ($_POST && in_array('Downtown', $_POST['interests'])) {
                                                                                                                    echo ' checked';
                                                                                                                } ?>>
                                        Downtown
                                    </label>
                                    </li>

                                    <li<?php if ($missing && in_array('howhear', $missing)) echo ' class="error"'; ?>>

                                        <?php if ($missing && in_array('howhear', $missing)) { ?>

                                            <strong>Please make a selection</strong>
                                        <?php } ?>

                                        <label for="howhear">How did you hear of Green Bay Journey?</label>
                                        <select name="howhear" id="howhear">
                                            <option value="" <?php
                                                                if (!$_POST || $_POST['howhear'] == '') {
                                                                    echo ' selected';
                                                                } ?>>Select one</option>
                                            <option value="Instagram" <?php
                                                                    if ($_POST && $_POST['howhear'] == 'Instagram') {
                                                                        echo ' selected';
                                                                    } ?>>Instagram</option>
                                            <option value="TikTok" <?php
                                                                                    if ($_POST && $_POST['howhear'] == 'TikTok') {
                                                                                        echo ' selected';
                                                                                    } ?>>TikTok</option>
                                            <option value="Family or Friend" <?php
                                                                            if ($_POST && $_POST['howhear'] == 'Family or Friend') {
                                                                                echo ' selected';
                                                                            } ?>>Family or Friend</option>
                                        </select>
                                        </li>

                                        <li<?php if (isset($errors['characteristics'])) echo ' class="error"'; ?>>
                                            <?php if (isset($errors['characteristics'])) { ?>

                                                <strong>Please select at least <?php echo $minList; ?></strong>
                                            <?php } ?>

                                            <label for="characteristics">What characteristics do you associate with Green Bay?</label>
                                            <select name="characteristics[]" size="6" multiple="multiple" id="characteristics">
                                                <option value="Historic" <?php
                                                                        if ($_POST && in_array('Historic', $_POST['characteristics'])) {
                                                                            echo ' selected';
                                                                        } ?>>Historic</option>
                                                <option value="Waterfront city" <?php
                                                                        if ($_POST && in_array('Waterfront city', $_POST['characteristics'])) {
                                                                            echo ' selected';
                                                                        } ?>>Waterfront city</option>
                                                <option value="Cold" <?php
                                                                            if ($_POST && in_array('Cold', $_POST['characteristics'])) {
                                                                                echo ' selected';
                                                                            } ?>>Cold</option>
                                                <option value="Diverse" <?php
                                                                        if ($_POST && in_array('Diverse', $_POST['characteristics'])) {
                                                                            echo ' selected';
                                                                        } ?>>Diverse</option>
                                                <option value="Wildlife" <?php
                                                                            if ($_POST && in_array('Wildlife', $_POST['characteristics'])) {
                                                                                echo ' selected';
                                                                            } ?>>Wildlife</option>
                                                <option value="Cheesehead" <?php
                                                                        if ($_POST && in_array('Cheesehead', $_POST['characteristics'])) {
                                                                            echo ' selected';
                                                                        } ?>>Cheesehead</option>
                                            </select>
                                            </li>
                                            <li<?php if (isset($errors['terms'])) echo ' class="error"'; ?>>
                                                <?php if (isset($errors['terms'])) { ?>
                                                    <strong>Please select the check box</strong>
                                                <?php } ?>

                                                <label for="terms">
                                                    <input type="checkbox" name="terms" value="accepted" id="terms" <?php
                                                                                                                    if ($_POST && !isset($errors['terms'])) {
                                                                                                                        echo ' checked';
                                                                                                                    } ?>>
                                                    I accept the terms of using this website
                                                </label>
                                                </li>
                                                <li<?php if (isset($errors['recaptcha'])) echo ' class="error"'; ?>>
                                                    <?php if (isset($errors['recaptcha'])) { ?>

                                                        <strong>Incorect Response</strong>
                                                    <?php }
                                                    echo "<label>Answer Challenge Question</label>";
                                                    echo g_recaptcha_get_form_control(); ?>

                                                    </li>
                                                    <li>
                                                        <input name="send" id="send" type="submit" value="Send message">
                                                    </li>
            </ol>
        </fieldset>
    </form>

    <h2>Debug Code</h2>
    <pre class="line-numbers">
<code class="language-php">
<?php if ($_POST && $mailSent) {
    echo "Message body\n\n";
    echo htmlentities($message) . "\n";
    echo "Headers\n\n";
    echo htmlentities($headers);
} ?>
</code>
</pre>


    <h2>Debug Code</h2>
    <pre class="line-numbers">
<code class="language-php">
<?php if ($_POST) {
    echo '$_POST: ';
    print_r($_POST);
} ?>
    
<?php if ($errors) {
    echo '$errors: ';
    print_r($errors);
} ?>
    
<?php if ($missing) {
    echo '$missing: ';
    print_r($missing);
} ?>

<?php if (isset($expected)) {
    echo '$expected: ';
    print_r($expected);
} ?>

<?php if (isset($name)) echo '$name: ' . $name; ?>

<?php if (isset($email)) echo '$email: ' . $email; ?>

<?php if (isset($comments)) echo '$comments: ' . $comments; ?>
    
<?php if (isset($g_recaptcha_response->success)) echo '$g_recaptcha_response->success: ' . $g_recaptcha_response->success; ?>

<?php if (isset($g_recaptcha_response)) echo 'var_dump($g_recaptcha_response): ' . var_dump($g_recaptcha_response); ?>

</code>
</pre>

</main>
<?php
include("{$_SERVER["DOCUMENT_ROOT"]}/php/includes/sidebar.php");
include("{$_SERVER["DOCUMENT_ROOT"]}/php/includes/footer.php");
?>