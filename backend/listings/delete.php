<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/dbclass.php';
include_once '../entities/listing.php';

$dbClass = new DBClass();
$connection = $dbClass->GetConnection();

$listing = new Listing($connection);

$data = json_decode(file_get_contents('php://input'));

$listing -> id = $data -> id;

if ($listing->Delete()) {
    echo '{';
        echo '"message": "Product was deleted."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to delete product."';
    echo '}';
}

?>