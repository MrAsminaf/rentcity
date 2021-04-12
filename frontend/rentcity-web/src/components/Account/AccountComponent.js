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
    const [picture, setPicture] = useState();

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
            case 'picture':
                setPicture(value);
                break;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const url = 'http://localhost/rentcity/backend/listings/create.php';
        const currentTime = new Date();

        let formData = new FormData();

        formData.append('ownerId', id);
        formData.append('title', title);
        formData.append('datePublished', `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`);
        formData.append('priceMonthly', priceMonthly);
        formData.append('numOfRooms', numOfRooms);
        formData.append('city', city);
        formData.append('description', description);
        formData.append('picture', e.target.picture.files[0]);

        console.log(e.target.picture.files[0]);

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: formData
        }).then( (response) => {

            response.json().then((result) => {
                console.log(result);
            });

            document.getElementById(`addListingModal`).style.display = 'none';
            window.location.reload();
        });
    }

    function handleEditFormSubmit(e) {
        e.preventDefault();

        const url = 'http://localhost/rentcity/backend/listings/update.php';

        let formData = new FormData();

        formData.append('id', e.target.id.value);
        formData.append('ownerId', e.target.ownerId.value);
        formData.append('title', e.target.title.value);
        formData.append('priceMonthly', e.target.priceMonthly.value);
        formData.append('numOfRooms', e.target.numOfRooms.value);
        formData.append('city', e.target.city.value);
        formData.append('description', e.target.description.value);

        if (e.target.picture.files[0] !== undefined) {
            formData.append('picture', e.target.picture.files[0]);
        }

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: formData
        }).then((response) => {

            document.getElementById(`editListingModal${e.target.id.value}`).style.display = 'none';

            response.json().then((result) => {
                console.log(result);
            });

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

                                <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
                                    
                                    <div className={styles.inputGroup}>
                                        <label htmlFor='picture'>Zdjęcie</label>
                                        <input name='picture' type='file' accept='image/png, image/jpeg'/>
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
                                            priceMonthly = {item.priceMonthly}
                                            pathToPicture = {item.pathToPicture}/>
                                    </Link>                   


                                    <div className={styles.listingButtons}>
                                        <button onClick={() =>{
                                            document.getElementById(`editListingModal${item.id}`).style.display = 'block';
                                        }}>Edytuj</button>

                                        <div id={`editListingModal${item.id}`} className={styles.modal} >
                                            <div id='modalContent' className={styles.modalContent}>

                                                <form onSubmit={handleEditFormSubmit} encType='multipart/form-data'>
                                                    <input type='hidden' name='id' value={item.id}/>
                                                    <input type='hidden' name='ownerId' value={item.ownerId}/>

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

                                                    <div className={styles.inputGroup}>
                                                        <label htmlFor='picture'>Zdjęcie</label>
                                                        <input name='picture' type='file' accept='image/png, image/jpeg'/>
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