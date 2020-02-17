<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
include "../db.php";
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();
if ($data['action'] == "insert") {
  $name = $data['name'];
  $email = $data['email'];
  $password = $data['password'];
  $q = mysqli_query($conn, "INSERT INTO `users` ( `name` , `email` , `password` ) VALUES ('$name', '$email', '$password')");
  if ($q) {
    $message['status'] = "success";
  } else {
    $message['status'] = "error";
  }
  echo json_encode($message);
}
echo mysqli_error($conn);
