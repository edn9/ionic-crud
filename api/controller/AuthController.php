<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

include('../db.php');

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $name = mysqli_real_escape_string($db, $_POST['name']);
  $passwd = mysqli_real_escape_string($db, $_POST['password']);

  $sql = "SELECT id FROM users WHERE name = '$name' and password = '$passwd'";
  $result = mysqli_query($db, $sql);
  $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
  $active = $row['active'];

  $count = mysqli_num_rows($result);

  // If result matched $myusername and $mypassword, table row must be 1 row

  if ($count == 1) {
    session_register("myusername");
    $_SESSION['login_user'] = $myusername;

    header("location: welcome.php");
  } else {
    $error = "Your Login Name or Password is invalid";
  }
}
