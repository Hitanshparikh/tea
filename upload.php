<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

if ($_FILES['excelFile']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['excelFile']['tmp_name'];
    
    $spreadsheet = IOFactory::load($fileTmpPath);
    $sheet = $spreadsheet->getActiveSheet();
    $rows = $sheet->toArray();

    $headers = array_shift($rows); // First row as headers

    echo json_encode([
        'success' => true,
        'headers' => $headers,
        'rows' => $rows
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'File upload error'
    ]);
}
?>
