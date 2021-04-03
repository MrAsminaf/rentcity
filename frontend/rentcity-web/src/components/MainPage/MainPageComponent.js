import React, { useEffect, useState } from 'react';
import ListingCompactComponent from '../ListingCompact/ListingCompactComponent';
import HeaderComponent from '../Header/HeaderComponent';
import styles from './MainPageComponent.module.css'

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
                    <ListingCompactComponent 
                    key={index} 
                    title={item.title}
                    datePublished={item.datePublished}/>
                ))
            }
            </div>
        </div>
    );
}

export default MainPageComponent;