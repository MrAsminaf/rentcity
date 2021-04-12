<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token,  Accept, Authorization, X-Requested-With');

include_once '../config/dbclass.php';
include_once '../entities/listing.php';

$dbClass = new DBClass();
$connection = $dbClass->GetConnection();

$listing = new Listing($connection);

$listing -> id              = $_POST['id'];
$listing -> title           = $_POST['title'];
$listing -> priceMonthly    = $_POST['priceMonthly'];
$listing -> numOfRooms      = $_POST['numOfRooms'];
$listing -> city            = $_POST['city'];
$listing -> description     = $_POST['description'];

if (isset($_FILES['picture']['name'])) {

    if (!file_exists('../albums/'.$listing -> ownerId.'/')) {
        mkdir('../albums/'.$listing -> ownerId.'/', 0777, true);
    }
    move_uploaded_file($_FILES["picture"]["tmp_name"], '../albums/'.$listing -> ownerId.'/'.$_FILES["picture"]["name"]);

    $listing -> pathToPicture   = '../albums/'.$_POST['ownerId'].'/'.$_FILES["picture"]["name"];
}

if ($listing->Update()) {
    echo json_encode(array("message" => "Successfully updated"));
    http_response_code(200);
    
} else {
    echo json_encode(array("message" => "Could not update"));
    http_response_code(400);
}

?>