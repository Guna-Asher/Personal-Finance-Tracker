<?php
header("Content-Type: application/json");
include 'db.php';

// Calculate total income
$incomeQuery = "SELECT SUM(amount) AS total_income FROM transactions WHERE type = 'income'";
$incomeResult = $conn->query($incomeQuery);
$incomeRow = $incomeResult->fetch_assoc();
$totalIncome = $incomeRow['total_income'] ?? 0;

// Calculate total expenses
$expenseQuery = "SELECT SUM(amount) AS total_expense FROM transactions WHERE type = 'expense'";
$expenseResult = $conn->query($expenseQuery);
$expenseRow = $expenseResult->fetch_assoc();
$totalExpenses = $expenseRow['total_expense'] ?? 0;

// Calculate savings (balance)
$totalSavings = $totalIncome - $totalExpenses;

echo json_encode([
    "totalIncome" => $totalIncome,
    "totalExpenses" => $totalExpenses,
    "totalSavings" => $totalSavings
]);

$conn->close();
?>
