<?php

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:', 'content-type, origin, authorization, accept');

include_once '../config/dbclass.php';

$dbClass = new DBClass();
$connection = $dbClass->GetConnection();

$query = "SELECT id, email, firstName, secondName FROM rentcity.accounts";

$stmt = $connection->prepare($query);
$stmt->execute();

$count = $stmt->rowCount();

if ($count > 0) {
    $accounts = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        if (isset($_GET['id'])) {
            if ($id != $_GET['id']) {
                continue;
            }
        }

        $account = array(
            "id" => $id,
            "email" => $email,
            "firstName" => $firstName,
            "secondName" => $secondName
        );

        array_push($accounts, $account);
    }

    echo json_encode($accounts);

} else {
    echo json_encode( array() );
}

?>