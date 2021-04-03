<?php

include_once '../config/dbclass.php';
require '../vendor/autoload.php';
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$dbClass = new DBClass();
$connection = $dbClass->GetConnection();

$data = json_decode(file_get_contents('php://input'));

$email = $data->email;
$password = $data->password;

$query = "SELECT * from rentcity.users WHERE email = '$email' LIMIT 0,1";

$stmt = $connection->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id = $row['id'];
    $email = $row['email'];
    $firstName = $row['firstName'];
    $secondName = $row['secondName'];
    $passwordInDB = $row['password'];

    if (password_verify($password, $passwordInDB)) {
        $key = "5F6C50AFD2915365C5AB0C21461040E7008BE92C5941D5B9922AD1E6FAC39B7E";
        $issuer = "rentcity";
        $audience = "localhost:8000";
        $issuedAt = time();
        $notBefore = $issuedAt + 1; // 1 second delay
        $expires = $issuedAt + 3 * 3600; //3 hours

        $token = array(
            "iss" => $issuer,
            "aud" => $audience,
            "iat" => $issuedAt,
            "nbf" => $notBefore,
            "exp" => $expires,
            "data" => array(
                "id" => $id,
                "email" => $email,
                "firstName" => $firstName,
                "secondName" => $secondName
            )
        );

        http_response_code(200);

        $jwt = JWT::encode($token, $key);
        echo json_encode(array(
            "message" => "User logged in",
            "token" => $jwt
        ));
    } else {
        http_response_code(400);
        echo json_encode(array("messgae" => "Login failed"));
    }
}

?>