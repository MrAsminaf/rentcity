import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import HeaderComponent from '../Header/HeaderComponent';
import styles from './ListingPageComponent.module.css';

function ListingPageComponent(props) {
    const {listingId} = useParams();
    const [listing, setListing] = useState();
    const [issuer, setIssuer] = useState();

    useEffect( () => {
        const url1 = `http://localhost/rentcity/backend/listings/read.php?id=${listingId}`;

        fetch(url1, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then( (response) => {
            if (response.status !== 200) {
                throw new Error("Server didn't respond");
            }

            response.json().then( (result) => {
                console.log(result[0]);
                setListing(result[0]);

                fetch(`http://localhost/rentcity/backend/accounts/read.php?id=${result[0].ownerId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then( (response) => {
                    response.json().then( (result) => {
                        console.log(result[0]);
                        setIssuer(result[0])
                    });
                });
            
            });

        }).catch( (error) => {
            console.log(error.message);
        });

    }, []);

    if (listing === undefined || issuer === undefined) {
        return <div>Still loading</div>
    }

    return (
        <div className={styles.container}>
            <HeaderComponent/>
            <div className={styles.content}>
                <section>
                    <h1>{listing.title}</h1>
                    <br/><br/>
                    <img/>

                    <h2>LOKALIZACJA</h2>
                    <p>{listing.city}</p>

                    <h2>OPIS</h2>
                    <p>{listing.description}</p>

                    <br/>

                    <h2>CENA</h2>
                    <p>{listing.priceMonthly} Zł</p>
                </section>

                <section>
                    <p>Imię: {issuer.firstName}</p>
                    <p>Nazwisko: {issuer.secondName}</p>
                    <p>E-mail: {issuer.email}</p>
                </section>
            </div>
        </div>
    );
}

export default ListingPageComponent;