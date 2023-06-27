<?php
session_start();

// Include the database configuration file
require_once 'db_config.php';

// Initialize variables
$username = "";
$email = "";
$errors = array();

// Register user
if (isset($_POST['reg_user'])) {
    // Retrieve form data
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password_1 = $_POST['password_1'];
    $password_2 = $_POST['password_2'];

    // Validate form inputs
    if (empty($username)) {
        array_push($errors, "Username is required");
    }
    if (empty($email)) {
        array_push($errors, "Email is required");
    }
    if (empty($password_1)) {
        array_push($errors, "Password is required");
    }
    if ($password_1 != $password_2) {
        array_push($errors, "The two passwords do not match");
    }

    // Check if the username or email already exists
    $user_check_query = "SELECT * FROM users WHERE username='$username' OR email='$email' LIMIT 1";
    $result = $conn->query($user_check_query);
    $user = $result->fetch_assoc();
  
    if ($user) { // If the user already exists
        if ($user['username'] === $username) {
            array_push($errors, "Username already exists");
        }
        if ($user['email'] === $email) {
            array_push($errors, "Email already exists");
        }
    }

    // If there are no errors, register the user
    if (count($errors) == 0) {
        $password = password_hash($password_1, PASSWORD_DEFAULT); // Hash the password before storing in the database

        // Insert user data into the database
        $query = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
        $conn->query($query);

        // Redirect to the login page after successful registration
        $_SESSION['success'] = "Registration successful. You can now log in.";
        header('location: login.php');
        exit();
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
    <div class="signup-container">
      <div class="header">
        <h2>Register</h2>
      </div>

      <form method="post" action="register.php">
        <?php include('errors.php'); ?>
        <div class="input-group">
          <label>Username</label>
          <input type="text" name="username" value="<?php echo $username; ?>">
        </div>
        <div class="input-group">
          <label>Email</label>
          <input type="email" name="email" value="<?php echo $email; ?>">
        </div>
        <div class="input-group">
          <label>Password</label>
          <input type="password" name="password_1">
        </div>
        <div class="input-group">
          <label>Confirm password</label>
          <input type="password" name="password_2">
        </div>
        <div class="input-group">
          <button type="submit" class="btn" name="reg_user">Register</button>
        </div>
        <p>
          Already a member? <a href="login.php">Sign in</a>
        </p>
      </form>
    </div>
  </div>
</body>
</html>
