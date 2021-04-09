import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ListingCompactComponent from '../ListingCompact/ListingCompactComponent';
import HeaderComponent from '../Header/HeaderComponent';
import { Link } from 'react-router-dom';
import styles from './AccountComponent.module.css';

function AccountComponent() {
    const {id} = useParams();
    const [listings, setListings] = useState([]);

    // AddListingStateVars
    const [title, setTitle] = useState('');
    const [priceMonthly, setPriceMonthly] = useState(0);
    const [numOfRooms, setNumOfRooms] = useState(0);
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');

    function handleAddListing() {
        document.getElementById('addListingModal').style.display = 'block';
    }

    function handleCloseListing() {
        document.getElementById('addListingModal').style.display  = 'none';
    }

    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        switch(name) {
            case 'title':
                setTitle(value);
                break;
            case 'priceMonthly':
                setPriceMonthly(value);
                break;
            case 'numOfRooms':
                setNumOfRooms(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'description':
                setDescription(value);
                break;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const url = 'http://localhost/rentcity/backend/listings/create.php';
        const currentTime = new Date();

        const data = {
            'ownerId': id,
            'title': title,
            'datePublished': `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`,
            'priceMonthly': priceMonthly,
            'numOfRooms': numOfRooms,
            'city': city,
            'description': description
        };

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
    }

    useEffect( () => {
        fetch(`http://localhost/rentcity/backend/listings/read.php?ownerid=${id}`, {
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

        let modal = document.getElementById('addListingModal');
        window.onclick = (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        };
    }, []);

    return(
        <div className={styles.container}>
            <HeaderComponent/>

            <div className={styles.content}>
                <menu>
                    <ul>
                        <li>Moje ogłoszenia</li>
                        <li>Edytuj dane</li>
                    </ul>
                </menu>

                <main>
                    <button id='addListingBtn' className={styles.addListingButton} onClick={handleAddListing}>Dodaj ogłoszenie</button>
                    <div id='addListingModal' className={styles.modal} >

                        <div id='modalContent' className={styles.modalContent}>

                            <form onSubmit={handleSubmit}>
                                <label htmlFor='title'>Tytuł ogłoszenia</label>
                                <input name='title' type='text' value={title}
                                    onChange={handleInputChange}/>

                                <label htmlFor='priceMonthly'>Cena za miesiąc</label>
                                <input name='priceMonthly' type='number' value={priceMonthly}
                                    onChange={handleInputChange}/>


                                <label htmlFor='numOfRooms'>Liczba pokoi</label>
                                <input name='numOfRooms' type='number' value={numOfRooms}
                                    onChange={handleInputChange}/>


                                <label htmlFor='city'>Miasto</label>
                                <input name='city' type='text' value={city}
                                    onChange={handleInputChange}/>


                                <label htmlFor='description'>Opis</label>
                                <input name='description' type='text' value={description}
                                    onChange={handleInputChange}/>

                                <button type='submit'>Dodaj ogłoszenie</button>
                            </form>

                            <span className={styles.close} onClick={handleCloseListing}>
                                Close
                            </span>
                        </div>
                    </div>
                    <div>
                    {
                        listings.map( (item, index) => (

                            <div className={styles.listingGroup} key={index}>
                                <Link to={`/listings/${item.id}`} >
                                    <ListingCompactComponent  
                                        title={item.title}
                                        datePublished={item.datePublished}
                                        priceMonthly={item.priceMonthly}/>
                                </Link>                   


                                <div className={styles.listingButtons}>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </div>

                        ))
                    }
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AccountComponent;