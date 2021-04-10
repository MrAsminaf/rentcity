<?php

class Listing {

    private $connection;

    public $id;
    public $ownerId;
    public $title;
    public $datePublished;
    public $priceMonthly;
    public $numOfRooms;
    #public $region;
    public $city;
    #public $address;
    #public $space;
    public $description;

    public function __construct($_connection) {
        $this->connection = $_connection;
    }

    public function Create() {
        $query = "INSERT INTO rentcity.listings (
            `ownerId`,
            `title`,
            `datePublished`,
            `priceMonthly`,
            `numOfRooms`,
            `city`,
            `description`
            ) 
            
            VALUES (
                '$this->ownerId',
                '$this->title',
                '$this->datePublished',
                '$this->priceMonthly',
                '$this->numOfRooms',
                '$this->city',
                '$this->description'
            );";

        $stmt = $this->connection->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    public function Read() {
        $query = "SELECT * FROM rentcity.listings";

        $stmt = $this->connection->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    public function Update() {
        $query = "
            UPDATE rentcity.listings
            SET `title` = '$this->title',
                `priceMonthly` = '$this->priceMonthly',
                `numOfRooms` = '$this->numOfRooms',
                `city` = '$this->city',
                `description` = '$this->description'
                WHERE `id` = '$this->id'";

        $stmt = $this->connection->prepare($query);
        $stmt -> execute();
        
        return $stmt;
    }

    public function Delete() {
        $query = "
            DELETE FROM rentcity.listings
            WHERE `id` = '$this->id'";
        $stmt = $this->connection->prepare($query);
        $stmt -> execute();

        return $stmt;
    }
}

?>