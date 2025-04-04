<?php
include 'db.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $type = $_POST['type'];
    $amount = $_POST['amount'];
    $description = $_POST['description'];
    $date = $_POST['date'];

    if (!is_numeric($amount) || $amount <= 0) {
        echo json_encode(["error" => "Invalid amount"]);
        exit;
    }

    $sql = "INSERT INTO transactions (type, amount, description, date) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sdss", $type, $amount, $description, $date);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Transaction added successfully"]);
    } else {
        echo json_encode(["error" => "Database error: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>