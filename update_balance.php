<?php
// Include the database connection file
require_once 'database_connection.php';

// Get the user's ID and new balance values from the form
$userID = $_POST['userID'];
$usdBalance = $_POST['usdBalance'];
$ethBalance = $_POST['ethBalance'];

// Prepare and execute the SQL query to update the user's balance
$sql = "UPDATE users SET usd_balance = :usdBalance, eth_balance = :ethBalance WHERE id = :userID";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    'usdBalance' => $usdBalance,
    'ethBalance' => $ethBalance,
    'userID' => $userID
]);

// Check if the update was successful
if ($stmt->rowCount() > 0) {
    echo "Balance updated successfully.";
} else {
    echo "Failed to update balance.";
}
?>
