import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderComponent.module.css';

function HeaderComponent() {
    return (
        <header>
            <Link to='/signin'>
                <button>Moje konto</button>
            </Link>
        </header>
    );
}

export default HeaderComponent;