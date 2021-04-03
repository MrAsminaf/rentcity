<?php

include_once '../config/dbclass.php';

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$dbClass = new DBClass();
$connection = $dbClass->GetConnection();

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$firstName = $data->firstName;
$secondName = $data->secondName;
$password = $data->password;
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

$query = "INSERT INTO rentcity.users (
        `email`,
        `firstName`,
        `secondName`,
        `password`
    ) VALUES (
        '$email',
        '$firstName',
        '$secondName',
        '$passwordHash'
    )";

$stmt = $connection->prepare($query);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(array("message" => "User registered"));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Server could not create the user"));
}

?>