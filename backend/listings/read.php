<?php

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:', 'content-type, origin, authorization, accept');

include_once '../config/dbclass.php';
include_once '../entities/listing.php';

$dbclass = new DBClass();
$connection = $dbclass->GetConnection();

$listing = new Listing($connection);

$stmt = $listing->Read();
$count = $stmt->rowCount();

if ($count > 0) {
    $listings = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        if (isset($_GET['ownerid'])) {
            if ($ownerId != $_GET['ownerid']) {
                continue;
            }
        }

        $listing = array(
            "id" => $id,
            "ownerId" => $ownerId,
            "title" => $title,
            "datePublished" => $datePublished,
            "priceMonthly" => $priceMonthly,
            "numOfRooms" => $numOfRooms,
            "city" => $city,
            "description" => $description
        );

        array_push($listings, $listing);
    }
    echo json_encode($listings);
} else {
    echo json_encode( array() );
}

?>