import React, { useEffect, useState } from 'react';
import ListingCompactComponent from '../ListingCompact/ListingCompactComponent';
import HeaderComponent from '../Header/HeaderComponent';
import styles from './MainPageComponent.module.css'
import { Link } from 'react-router-dom';

function MainPageComponent() {
    const [listings, setListings] = useState();

    useEffect(() => {
        fetch('http://localhost/rentcity/backend/listings/read.php', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then( (result) => {

            if (result.status !== 200) {
                throw new Error("Server didn't respond");
            }

            result.json().then( (listingsList) => {
                setListings(listingsList);
            });

        }).catch( (error) => {
            console.log(error.message);
        });
    }, []);

    if (listings === undefined) {
        return <div>Still loading...</div>
    }

    return (
        <div className={styles.container}>
            <HeaderComponent/>
            <div className={styles.listing_list}>
            {
                listings.map( (item, index) => (
                    <Link className={styles.link} key={index} to={`/listings/${item.id}`}>
                        <ListingCompactComponent onClick title={item.title} datePublished={item.datePublished}/>
                    </Link>
                ))
            }
            </div>
        </div>
    );
}

export default MainPageComponent;