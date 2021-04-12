import React from 'react';
import styles from './ListingCompactComponent.module.css';

function ListingCompactComponent(props) {
    return (
        <div className={styles.card}>
            <img src={`http://localhost/rentcity/backend/${props.pathToPicture.substring(3)}`} className={styles.img}/>
            <div className={styles.details}>
                <p className={styles.title}>{props.title}</p>
                <p className={styles.city}>Miasto: {props.city}</p>
                <p className={styles.price}>{props.priceMonthly} zł na miesiąc</p>
                <p className={styles.date}>{props.datePublished}</p>
            </div>
        </div>
    );
}

export default ListingCompactComponent;