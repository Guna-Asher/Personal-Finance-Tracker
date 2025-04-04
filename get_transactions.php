<?php
header("Content-Type: application/json");
include 'db.php';

$sql = "SELECT id, user_id, category_id, type, amount, description, date FROM transactions ORDER BY date DESC";
$result = $conn->query($sql);

$transactions = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $transactions[] = $row;
    }
}

echo json_encode($transactions);
$conn->close();
?>