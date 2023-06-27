<?php
session_start();

// Include the database configuration file
require_once 'db_config.php';

// Initialize variables
$username = "";
$errors = array();

// User login
if (isset($_POST['login_user'])) {
    // Retrieve form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validate form inputs
    if (empty($username)) {
        array_push($errors, "Username is required");
    }
    if (empty($password)) {
        array_push($errors, "Password is required");
    }

    // If there are no errors, verify the user credentials
    if (count($errors) == 0) {
        $query = "SELECT * FROM users WHERE username='$username' LIMIT 1";
        $result = $conn->query($query);
        $user = $result->fetch_assoc();

        if ($user) {
            if (password_verify($password, $user['password'])) {
                // User found and password matches
                $_SESSION['username'] = $username;
                $_SESSION['success'] = "You are now logged in";
                header('location: index.html'); // Redirect to index.html or any other authenticated page
                exit();
            } else {
                // Invalid password
                array_push($errors, "Invalid password");
            }
        } else {
            // User not found
            array_push($errors, "Invalid username");
        }
    }
}
?>









<!DOCTYPE html>
<html>
<head>
  <title>Registration system PHP and MySQL</title>
  <link rel="stylesheet" type="text/css" href="style1.css">
</head>
<body>
  <div class="container">
    <div class="login-container">
      <div class="header">
        <h2>Login</h2>
      </div>

      <form method="post" action="login.php">
        <?php include('errors.php'); ?>
        <div class="input-group">
          <label>Username</label>
          <input type="text" name="username">
        </div>
        <div class="input-group">
          <label>Password</label>
          <input type="password" name="password">
        </div>
        <div class="input-group">
          <button type="submit" class="btn" name="login_user">Login</button>
        </div>
        <p>
          Not yet a member? <a href="register.php">Sign up</a>
        </p>
      </form>
    </div>

    <div class="image-container">
      <img src="logo.png" alt="Profile Picture">
    </div>
  </div>
</body>
</html>
