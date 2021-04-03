import React from 'react';
import styles from './ListingCompactComponent.module.css';

function ListingCompactComponent(props) {
    return (
        <div className={styles.card}>
            <img/>
            <div className={styles.details}>
                <p>{props.title}</p>
                <p>{props.datePublished}</p>
            </div>
        </div>
    );
}

export default ListingCompactComponent;