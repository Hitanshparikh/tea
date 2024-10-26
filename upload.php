<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

if ($_FILES['excelFile']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['excelFile']['tmp_name'];

    try {
        $spreadsheet = IOFactory::load($fileTmpPath);
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray();

        if (!empty($rows)) {
            $headers = array_shift($rows); // First row as headers

            // Sanitize and prepare data
            $cleanRows = array_map(function($row) {
                return array_map('htmlspecialchars', $row); // Sanitize each cell
            }, $rows);

            echo json_encode([
                'success' => true,
                'headers' => $headers,
                'rows' => $cleanRows
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'No data found in the spreadsheet'
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error processing the file: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'File upload error'
    ]);
}
?>