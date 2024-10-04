import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:5000/auth-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

async function registerUser(credentials) {
    return fetch('http://localhost:5000/register-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleLogin = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });
        console.log(response.message);
        setToken(response.token);
    }
    const handleRegister = async e => {
        e.preventDefault();
        const response = await registerUser({
            username,
            password
        });
        console.log(response.message);
        setToken(response.token);
    }

    return (
        <div className="login-wrapper">
            <h1>Log In Page</h1>
            <form className=''>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit" onClick={handleLogin}>Login</button>
                </div>
                <div>
                    <button type="submit" onClick={handleRegister}>Register</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};