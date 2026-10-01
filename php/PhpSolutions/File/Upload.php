<?php

namespace php\PhpSolutions\File;

## Set the timezone to your location
ini_set("date.timezone", "America/Chicago");

class Upload {
    protected $destination;
    protected $max = 51200;
    protected $messages = [];
    protected $permitted = [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/webp'
    ];
    protected $newName;
    protected $filenames = [];

    public function __construct($path) {
        if (is_dir($path) && is_writable($path)) {
            $this->destination = rtrim($path, '/\\') . DIRECTORY_SEPARATOR;
        } else {
            throw new \Exception("$path must be a valid, writable directory (Class: Upload).");
        }
    }

    public function upload($fieldname, $size = null, ?array $mime = null, $renameDuplicates = true) {
        $uploaded = $_FILES[$fieldname];
        if (!is_null($size) && $size > 0) {
            $this->max = (int)$size;
        }
        if (!is_null($mime)) {
            $this->permitted = array_merge($this->permitted, $mime);
        }
        if (is_array($uploaded['name'])) {
            // deal with multiple uploads
            $numFiles = count($uploaded['name']);
            $keys = array_keys($uploaded);
            for ($i = 0; $i < $numFiles; $i++) {
                $values = array_column($uploaded, $i);
                $currentfile = array_combine($keys, $values);
                $this->processUpload($currentfile, $renameDuplicates);
            }
        } else {
            $this->processUpload($uploaded, $renameDuplicates);
        }
    }

    public function getMessages() {
        return $this->messages;
    }

    public function getMaxSize() {
        return number_format($this->max / 1024, 1) . ' KB';
    }

    public function getFilenames() {
        return $this->filenames;
    }

    protected function checkFile($file) {
        $checkFileErrorLevel = $this->getErrorLevel($file);
        $checkFileCheckSize = $this->checkSize($file);
        if (!empty($file['type'])) {
            $checkFileCheckType = $this->checkType($file);
        }

        if ($checkFileErrorLevel && $checkFileCheckSize && $checkFileCheckType) {
            return true;
        } else {
            return false;
        }
    }

    protected function getErrorLevel($file) {
        switch ($file['error']) {
            case 0:
                return true;
            case 1:
            case 2:
                $this->messages[] = $file['name'] . ' is too big: (max: ' .
                    $this->getMaxSize() . ').';
                break;
            case 3:
                $this->messages[] = $file['name'] . ' was only partially 
                        uploaded.';
                break;
            case 4:
                $this->messages[] = 'No file submitted.';
                break;
            default:
                $this->messages[] = 'Sorry, there was a problem uploading ' .
                    $file['name'];
        }
        return false;
    }

    protected function checkSize($file) {
        if ($file['error'] == 1 || $file['error'] == 2) {
            return false;
        } elseif ($file['size'] == 0) {
            $this->messages[] = $file['name'] . ' is an empty file.';
            return false;
        } elseif ($file['size'] > $this->max) {
            $this->messages[] = $file['name'] . ' exceeds the maximum size 
                    for a file (' . $this->getMaxSize() . ').';
            return false;
        }
        return true;
    }

    protected function checkType($file) {
        if (!in_array($file['type'], $this->permitted)) {
            $this->messages[] = $file['name'] . ' is not permitted type of file.';
            return false;
        }
        return true;
    }

    protected function checkName($file, $renameDuplicates) {
        $this->newName = null;

        // assign filename and extension and convert to lowercase
        $basename = mb_strtolower(pathinfo($file['name'], PATHINFO_FILENAME));
        $extension = mb_strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        // remove any characters that are not letters, numbers, spaces, or hyphens
        $basename = preg_replace(['/[^a-zA-Z0-9 -]/', '/[ -]+/', '/^-|-$/'], ['', '-', ''], $basename);
        
        // if basename had all the characters removed use a timestamp
        $basename = mb_strlen($basename) > 0 ? $basename : time();
        
        // if extension is jpeg rename as jpg (match extension used in Thumbnail class)
        if ($extension == 'jpeg') $extension = 'jpg';

        // concatenate filename and extension
        $nospaces = $basename .  '.' . $extension;

        if ($nospaces != $file['name']) {
            $this->newName = $nospaces;
        }
        if ($renameDuplicates) {
            $name = $this->newName ?? $file['name'];
            if (file_exists($this->destination . $name)) {
                // rename file
                $basename = pathinfo($name, PATHINFO_FILENAME);
                $extension = pathinfo($name, PATHINFO_EXTENSION);
                $this->newName = $basename . '-' . time() . ".$extension";
            }
        }
    }

    protected function processUpload($uploaded, $renameDuplicates) {
        if ($this->checkFile($uploaded)) {
            $this->checkName($uploaded, $renameDuplicates);
            $this->moveFile($uploaded);
        }
    }

    ## Updated Method - Modified Author's Code
    ## if ($success)  - Add the filename to the array of uploaded files    
    protected function moveFile($file) {
        $filename = $this->newName ?? $file['name'];
        $success = move_uploaded_file(
            $file['tmp_name'],
            $this->destination . $filename
        );
        if ($success) {
            // Add the amended filename to the array of uploaded files
            $this->filenames[] = $filename;
            $result = $file['name'] . ' was uploaded successfully';
            if (!is_null($this->newName)) {
                $result .= ', and was renamed ' . $this->newName;
            }
            $this->messages[] = $result;
        } else {
            $this->messages[] = 'Could not upload ' . $file['name'];
        }
    }
}