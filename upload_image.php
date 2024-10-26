<?php
    // Receive the JSON data
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['image'])) {
        $image_data = $data['image'];
        
        // Remove 'data:image/png;base64,' part
        $image_data = str_replace('data:image/png;base64,', '', $image_data);
        $image_data = str_replace(' ', '+', $image_data);
        $file_data = base64_decode($image_data);
        
        // Save the image to the server
        $file_name = 'filtered_table_' . time() . '.png';
        file_put_contents('images/' . $file_name, $file_data);
        
        echo json_encode(['success' => true, 'file_name' => $file_name]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No image data found']);
    }
?>
