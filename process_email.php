<?php
if (isset($_POST['tableData'])) {
    $data = json_decode($_POST['tableData'], true);

    $groupedData = [];
    foreach ($data as $row) {
        $name = $row[1];  // Assuming first column is Name
        $email = $row[15]; // Assuming second column is Email
        $groupedData[$name]['email'] = $email;
        $groupedData[$name]['rows'][] = $row;
    }

    foreach ($groupedData as $name => $details) {
        $email = $details['email'];
        $rows = $details['rows'];

        $subject = "Offer Intimation - List Number " . $rows[0][2]; // Adjust column index for List Number
        $message = "Please find the attached.";
        
        // You should replace the following line with actual image generation code
        $image = generateImage($rows);  // Use GD or ImageMagick to create an image

        // Send email
        sendEmail($email, $subject, $message, $image);
    }
}

function generateImage($rows) {
    // Code to generate image from table rows using GD/ImageMagick
    // Return the path to the generated image
}

function sendEmail($to, $subject, $message, $attachment) {
    // Implement the email sending functionality with attachment (use PHPMailer or built-in mail function)
}
?>
