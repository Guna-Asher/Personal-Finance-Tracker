<?php
$host = "localhost";
$user = "root"; // Default user in XAMPP
$password = ""; // Default password is empty in XAMPP
$dbname = "finance_tracker";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>