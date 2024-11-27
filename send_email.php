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
    $mail->Username = 'email'; // Your email address
    $mail->Password = 'App password here'; // Your email password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Recipients
    $mail->setFrom('email', 'Name');
    $mail->addAddress('email1');
    $mail->addCC('email2');
    $mail->addCC('email3');
    $mail->addCC('email4');

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
