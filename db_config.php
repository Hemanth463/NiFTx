<?php
// Database configuration
$host = "localhost";
$username = "root";
$password = "";
$database_name = "login";

// Create database connection
$conn = new mysqli($host, $username, $password, $database_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
