import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderComponent.module.css';

function HeaderComponent() {

    function handleLogout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
        
        window.location.reload();
    }

    return (
        <header>
            <Link to={sessionStorage.getItem('token') ? `/account/${sessionStorage.getItem('id')}` : '/signin'}>
                <button>Moje konto</button>
            </Link>
            { sessionStorage.getItem('token') ? <button onClick={handleLogout}>Wyloguj się</button> : '' }
        </header>
    );
}

export default HeaderComponent;