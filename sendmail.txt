<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
if (!$data || empty($data['gardenName']) || empty($data['tableHTML'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$gardenName = htmlspecialchars($data['gardenName']);
$tableHTML = $data['tableHTML'];

// PHPMailer setup
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Set your SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'hiviz2024@gmail.com'; // Your email address
    $mail->Password = 'vyui cniu fqhb blpq'; // Your email password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Recipients
    $mail->setFrom('hiviz2024@gmail.com', 'Gautam Enterprise');
    $mail->addAddress('hitanshpparikh@gmail.com');
    $mail->addCC('hitanshpppparikh@gmail.com');
    $mail->addCC('techtitan2005@gmail.com');
    $mail->addCC('Kushal.desaiofficial@gmail.com');

    // Content
    $mail->isHTML(true);
    $mail->Subject = "$gardenName Offer Intimation";
    $mail->Body = "
        <h3>Garden: $gardenName</h3>
        $tableHTML
        <p>Please find attached</p>
    ";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "Email could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
