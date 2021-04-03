import React, { useEffect, useState } from 'react';
import styles from './SignInComponent.module.css';

function SignInComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    useEffect( () => {
        document.querySelector('#loginTab').addEventListener('click', () => {
            document.getElementById('login').style.display = "block";
            document.getElementById('register').style.display = "none";
        });

        document.querySelector('#registerTab').addEventListener('click', () => {
            document.getElementById('register').style.display = "block";
            document.getElementById('login').style.display = "none";
        });
    }, []);

    return(
        <div className={styles.card}>
            <ul className="tabsMenu">
                <li id="loginTab"><a href="#login">Zaloguj się</a></li>
                <li id="registerTab"><a href="#register">Zarejestruj się</a></li>
            </ul>
            <div className={styles.tab}>
                <div id="login" className={styles.tabConent}>
                    <form>
                        <label htmlFor='email'>Email</label>
                        <input name='email' type='text' id='emailInput'
                                onChange={handleInputChange}/>

                        <label htmlFor='password'>Hasło</label>
                        <input name='password' type='password' id='passwordInput'
                                onChange={handleInputChange} />
                    </form>
                </div>
                <div id="register" className={styles.tabContent}>Rejestracja</div>
            </div>
        </div>
    );
}

export default SignInComponent;