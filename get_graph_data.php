<?php
require 'database.php';

$response = [
    "months" => [],
    "income" => [],
    "expense" => [],
    "categories" => [],
    "categoryAmounts" => []
];

// ✅ Fetch Income & Expenses per Month
$query = "SELECT DATE_FORMAT(date, '%b %Y') AS month, 
                 SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income, 
                 SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense
          FROM transactions 
          GROUP BY month ORDER BY date ASC";
$result = $conn->query($query);

while ($row = $result->fetch_assoc()) {
    $response["months"][] = $row["month"];
    $response["income"][] = (float)$row["income"];
    $response["expense"][] = (float)$row["expense"];
}

// ✅ Fetch Expense Categories
$query = "SELECT description AS category, SUM(amount) AS total FROM transactions WHERE type = 'expense' GROUP BY category";
$result = $conn->query($query);

while ($row = $result->fetch_assoc()) {
    $response["categories"][] = $row["category"];
    $response["categoryAmounts"][] = (float)$row["total"];
}

// ✅ Return Data as JSON
echo json_encode($response);
?>