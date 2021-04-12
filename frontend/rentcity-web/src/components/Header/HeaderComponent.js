import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderComponent.module.css';
import logo from '../../images/logo.png'

function HeaderComponent() {

    function handleLogout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
        
        window.location.reload();
    }

    return (
        <header>
            <Link className={styles.logoLink} to={`/`}>
                <img className={styles.img} src={logo}/>
            </Link>
            <Link to={sessionStorage.getItem('token') ? `/account/${sessionStorage.getItem('id')}` : '/signin'}>
                <button>Moje konto</button>
            </Link>
            { sessionStorage.getItem('token') ? <button onClick={handleLogout}>Wyloguj się</button> : '' }
        </header>
    );
}

export default HeaderComponent;