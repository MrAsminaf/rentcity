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

    function handleEditFormSubmit(e) {
        e.preventDefault();

        console.log(e.target.id.value);
        console.log(e.target.title.value);
        console.log(e.target.priceMonthly.value);
        console.log(e.target.numOfRooms.value);
        console.log(e.target.city.value);
        console.log(e.target.description.value);

        const url = 'http://localhost/rentcity/backend/listings/update.php';

        const data = {
            'id': e.target.id.value,
            'title': e.target.title.value,
            'priceMonthly': e.target.priceMonthly.value,
            'numOfRooms': e.target.numOfRooms.value,
            'city': e.target.city.value,
            'description': e.target.description.value
        };

        fetch(url, {
            method:'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(data)
        }).then(() => {
            document.getElementById(`editListingModal${e.target.id.value}`).style.display = 'none';
            window.location.reload();
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

        document.getElementById('myListingsBtn').addEventListener('click', () => {
            document.getElementById('myListings').style.display = 'block';
            document.getElementById('editPersonalData').style.display = 'none';
        });

        document.getElementById('editPersonalDataBtn').addEventListener('click', () => {
            document.getElementById('myListings').style.display = 'none';
            document.getElementById('editPersonalData').style.display = 'block';
        });

    }, []);

    return(
        <div className={styles.container}>
            <HeaderComponent/>

            <div className={styles.content}>
                <menu>
                    <ul>
                        <li id='myListingsBtn'>Moje ogłoszenia</li>
                        <li id='editPersonalDataBtn'>Edytuj dane</li>
                    </ul>
                </menu>

                <main>
                    <section id='myListings' className={styles.myListings}>
                        <button id='addListingBtn' className={styles.addListingButton} onClick={handleAddListing}>Dodaj ogłoszenie</button>
                        <div id='addListingModal' className={styles.modal} >

                            <div id='modalContent' className={styles.modalContent}>

                                <form onSubmit={handleSubmit}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor='title'>Tytuł ogłoszenia</label>
                                        <input name='title' type='text' value={title}
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor='priceMonthly'>Cena za miesiąc</label>
                                        <input name='priceMonthly' type='number' value={priceMonthly}
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor='numOfRooms'>Liczba pokoi</label>
                                        <input name='numOfRooms' type='number' value={numOfRooms}
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor='city'>Miasto</label>
                                        <input name='city' type='text' value={city}
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor='description'>Opis</label>
                                        <input name='description' type='text' value={description}
                                            onChange={handleInputChange}/>
                                    </div>
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
                                            title = {item.title}
                                            datePublished = {item.datePublished}
                                            priceMonthly = {item.priceMonthly}/>
                                    </Link>                   


                                    <div className={styles.listingButtons}>
                                        <button onClick={() =>{
                                            document.getElementById(`editListingModal${item.id}`).style.display = 'block';
                                        }}>Edytuj</button>

                                        <div id={`editListingModal${item.id}`} className={styles.modal} >
                                            <div id='modalContent' className={styles.modalContent}>

                                                <form onSubmit={handleEditFormSubmit}>
                                                    <input type='hidden' name='id' value={item.id}/>

                                                    <div className={styles.inputGroup}>
                                                        <label htmlFor='title'>Tytuł ogłoszenia</label>
                                                        <input name='title' type='text' defaultValue={item.title} />
                                                    </div>

                                                    <div className={styles.inputGroup}>
                                                        <label htmlFor='priceMonthly'>Cena za miesiąc</label>
                                                        <input name='priceMonthly' type='number' defaultValue={item.priceMonthly} />
                                                    </div>

                                                    <div className={styles.inputGroup}>
                                                        <label htmlFor='numOfRooms'>Liczba pokoi</label>
                                                        <input name='numOfRooms' type='number' defaultValue={item.numOfRooms} />
                                                    </div>

                                                    <div className={styles.inputGroup}>
                                                        <label htmlFor='city'>Miasto</label>
                                                        <input name='city' type='text' defaultValue={item.city} />
                                                    </div>

                                                    <div className={styles.inputGroup}>
                                                        <label htmlFor='description'>Opis</label>
                                                        <input name='description' type='text' defaultValue={item.description}/>
                                                    </div>

                                                    <button type='submit'>Zapisz zmiany</button>
                                                </form>

                                                <span className={styles.close} onClick={() => {
                                                    document.getElementById(`editListingModal${item.id}`).style.display = 'none';
                                                }}>
                                                    Zamknij
                                                </span>

                                            </div>
                                        </div>

                                        <button onClick={() => {
                                            let data = {
                                                "id": item.id
                                            };

                                            fetch('http://localhost/rentcity/backend/listings/delete.php', {
                                                method:'DELETE',
                                                mode: 'cors',
                                                cache: 'no-cache',
                                                body: JSON.stringify(data)
                                            }).then(() => {
                                                window.location.reload();
                                            });
                                        }}>Usuń</button>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </section>


                    <section id='editPersonalData' className={styles.editPersonalData}>
                        Moje dane
                    </section>
                </main>
            </div>
            
        </div>
    );
}

export default AccountComponent;