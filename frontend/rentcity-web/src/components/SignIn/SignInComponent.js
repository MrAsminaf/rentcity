import React, { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './SignInComponent.module.css';

function SignInComponent() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'secondName':
                setSecondName(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const url = 'http://localhost/rentcity/backend/accounts/login.php';

        const data = {
            'email': email,
            'password': password
        };

        const response = fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( (answer) => {
            if (answer.status !== 200) {
                throw new Error("Server didn't respond");
            }

            answer.json().then( (result) => {
                console.log(result);

                sessionStorage.setItem('token', result.token);
                sessionStorage.setItem('id', result.id);
            });

            history.push('/');

        }).catch( (error) => {
            console.log(error.message);
        });
    }

    function handleRegisterSubmit(e) {
        e.preventDefault();
        const url = 'http://localhost/rentcity/backend/accounts/register.php';

        const data = {
            'email': email,
            'firstName': firstName,
            'secondName': secondName,
            'password': password
        };

        const response = fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( (answer) => {
            if (answer.status !== 200) {
                throw new Error("Server didn't respond");
            }

            answer.json().then( (result) => {
                console.log(result);
            });


        }).catch( (error) => {
            console.log(error.message);
        });
    }

    useEffect( () => {
        document.querySelector('#loginTab').addEventListener('click', () => {
            document.getElementById('login').style.display = "block";
            document.getElementById('register').style.display = "none";
            document.getElementById('line').style.alignSelf = 'flex-start';
        });

        document.querySelector('#registerTab').addEventListener('click', () => {
            document.getElementById('register').style.display = "block";
            document.getElementById('login').style.display = "none";
            document.getElementById('line').style.alignSelf = 'flex-end';
        });
    }, []);

    return(
        <div className={styles.container}>
            <div className={styles.card}>

                <ul className={styles.tabsMenu}>
                    <li id="loginTab"><a href="#login">Zaloguj się</a></li>
                    <li id="registerTab"><a href="#register">Zarejestruj się</a></li>
                </ul>

                <div id='line' className={styles.line}></div>

                <div className={styles.tab}>

                    <div id="login" className={styles.login}>
                        <form onSubmit={handleSubmit}>

                            <div className={styles.inputGroup}>
                                <label htmlFor='email'>Email</label>
                                <input name='email' type='text' id='emailInput'
                                    onChange={handleInputChange}/>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor='password'>Hasło</label>
                                <input name='password' type='password' id='passwordInput'
                                    onChange={handleInputChange} />
                            </div>


                            <button type='submit'>Zaloguj się</button>
                        </form>
                    </div>

                    <div id="register" className={styles.register}>
                        <form onSubmit={handleRegisterSubmit}>

                            <div className={styles.inputGroup}>
                                <label htmlFor='email'>Email</label>
                                <input name='email' type='text' id='emailInput' onChange={handleInputChange} />
                            </div>


                            <div className={styles.inputGroup}>
                                <label htmlFor='firstName'>Imię</label>
                                <input name='firstName' type='text' id='firstNameInput' onChange={handleInputChange} />
                            </div>


                            <div className={styles.inputGroup}>
                                <label htmlFor='secondName'>Nazwisko</label>
                                <input name='secondName' type='text' id='secondNameInput' onChange={handleInputChange} />
                            </div>


                            <div className={styles.inputGroup}>
                                <label htmlFor='password'>Hasło</label>
                            <input name='password' type='password' id='passwordInput' onChange={handleInputChange} />
                            </div>

                            <button type='submit'>Zarejestruj się</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInComponent;