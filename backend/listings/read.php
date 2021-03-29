<?php

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/dbclass.php';
include_once '../entities/listing.php';

$dbclass = new DBClass();
$connection = $dbclass->GetConnection();

$listing = new Listing($connection);

$stmt = $listing->Read();
$count = $stmt->rowCount();

if ($count > 0) {
    $products = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $p = array(
            "id" => $id,
            "numOfRooms" => $numOfRooms,
            "description" => $description
        );

        array_push($products, $p);
    }
    echo json_encode($products);
} else {
    echo json_encode( array() );
}

?>