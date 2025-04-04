<?php
include 'db.php';

$result = $conn->query("SELECT id, description, amount, type, date FROM transactions ORDER BY STR_TO_DATE(date, '%Y-%m-%d') DESC");

$transactions = [];
while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

echo json_encode($transactions);
$conn->close();
?>