<?php

header("Access-Control-Allow-Methods: POST");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/dbclass.php';
include_once '../entities/listing.php';

$dbclass = new DBClass();
$connection = $dbclass->GetConnection();

$listing = new Listing($connection);

$listing -> ownerId         = $_POST['ownerId'];
$listing -> title           = $_POST['title'];
$listing -> datePublished   = $_POST['datePublished'];
$listing -> priceMonthly    = $_POST['priceMonthly'];
$listing -> numOfRooms      = $_POST['numOfRooms'];
$listing -> city            = $_POST['city'];
$listing -> description     = $_POST['description'];
$listing -> pathToPicture   = '../albums/'.$listing -> ownerId.'/'.$_FILES["picture"]["name"];

if (!file_exists('../albums/'.$listing -> ownerId.'/')) {
    mkdir('../albums/'.$listing -> ownerId.'/', 0777, true);
}

move_uploaded_file($_FILES["picture"]["tmp_name"], '../albums/'.$listing -> ownerId.'/'.$_FILES["picture"]["name"]);


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