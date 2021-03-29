<?php

class DBClass {
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "rentcity"; // fill the db name

    public $connection;

    public function GetConnection() {
        $this->connection = null;

        try {

            $this->connection = new PDO(
                "mysql:host-".$this->host
                ."dbname=".$this->database
                , $this->username
                , $this->password);

        } catch(PDOException $exception) {

            echo "Error: ".$exception->getMessage();

        }

        return $this->connection;
    }
}

?>