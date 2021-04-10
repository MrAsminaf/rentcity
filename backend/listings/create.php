<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/dbclass.php';
include_once '../entities/listing.php';

$dbclass = new DBClass();
$connection = $dbclass->GetConnection();

$listing = new Listing($connection);

$data = json_decode(file_get_contents('php://input'));

$listing -> ownerId         = $data -> ownerId;
$listing -> title           = $data -> title;
$listing -> datePublished   = $data -> datePublished;
$listing -> priceMonthly    = $data -> priceMonthly;
$listing -> numOfRooms      = $data -> numOfRooms;
$listing -> city            = $data -> city;
$listing -> description     = $data -> description;

if ($listing->create()) {
    echo '{';
        echo '"message": "Product was created."';
    echo '}';
}
else {
    echo '{';
        echo '"message": "Unable to create product."';
    echo '}';
}

?>