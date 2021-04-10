<?php

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PATCH");
header('Access-Control-Allow-Headers:', 'content-type, origin, authorization, accept');

include_once '../config/dbclass.php';
include_once '../entities/listing.php';

$dbClass = new DBClass();
$connection = $dbClass->GetConnection();

$listing = new Listing($connection);

$data = json_decode(file_get_contents('php://input'));

$listing -> id              = $data -> id;
$listing -> title           = $data -> title;
$listing -> priceMonthly    = $data -> priceMonthly;
$listing -> numOfRooms      = $data -> numOfRooms;
$listing -> city            = $data -> city;
$listing -> description     = $data -> description;

if ($listing->Update()) {
    echo '{';
        echo '"message": "Product was updated."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to update product."';
    echo '}';
}
?>