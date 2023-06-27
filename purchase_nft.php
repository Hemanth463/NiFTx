<?php
session_start();
require_once 'database_connection.php';

if (!isset($_SESSION['user_id'])) {
    die('User not logged in'); // Handle the case when the user is not logged in
}

$nftId = $_POST['nftId']; // The ID of the NFT being purchased
$price = $_POST['price']; // The price of the NFT in ETH

// Get the user's ETH balance from the database
$userId = $_SESSION['user_id'];
$sql = "SELECT eth_balance FROM users WHERE id = :userId";
$stmt = $pdo->prepare($sql);
$stmt->execute(['userId' => $userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    die('User not found'); // Handle the case when the user is not found in the database
}

$ethBalance = $user['eth_balance'];

if ($ethBalance >= $price) {
    // Sufficient balance, proceed with the purchase

    // Update the user's ETH balance
    $newEthBalance = $ethBalance - $price;
    $sql = "UPDATE users SET eth_balance = :newEthBalance WHERE id = :userId";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['newEthBalance' => $newEthBalance, 'userId' => $userId]);

    // Insert the purchased NFT into the user's collection
    $sql = "INSERT INTO user_nfts (user_id, nft_id) VALUES (:userId, :nftId)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['userId' => $userId, 'nftId' => $nftId]);

    echo 'success'; // Send a success response back to the JavaScript code
} else {
    // Insufficient balance, redirect to the payment gateway page
    echo 'insufficient'; // Send an insufficient balance response back to the JavaScript code
}
?>
