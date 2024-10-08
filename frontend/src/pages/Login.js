import React, { useState } from 'react';
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    return fetch('http://localhost:8080/auth-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

async function registerUser(credentials) {
    return fetch('http://localhost:8080/register-user', {
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
    const [name, setName] = useState();
    const [registerState, setRegisterState] = useState(false);


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
            password,
            name
        });
        console.log(response.token);
        if (response.token === 200) {
            setRegisterState(false);
        }
    }
    return (
        <div className=''>
            <h1 className='text-center mt-56'>WELCOME</h1>
            <form className='w-1/4 mx-auto' onSubmit={handleLogin} style={{ display: (registerState ? "none" : "") }}>
                <input type="text" placeholder="username" className="w-full rounded-md border-gray-100 p-3 mt-4 mb-3 box-border" onChange={e => setUserName(e.target.value)} required />
                <input type="password" placeholder="password" className="w-full rounded-md border-gray-100 p-3 box-border mb-3" onChange={e => setPassword(e.target.value)} required />
                <button type="submit" className='rounded-md w-full mx-auto border-0  h-[35px] p-3 bg-green-500'>Login</button>
            </form>
            <div className="flex items-center justify-center mt-4" style={{ display: (registerState ? "none" : "") }}>
                <p className="mr-2">Don't have an account?</p>
                <button onClick={() => { setRegisterState(true) }} className='rounded-md px-10 border border-spacing-0 py-2'>Register</button>
            </div>
            <form className='md:w-1/4 w-[90%] mx-auto' style={{ display: (registerState ? "" : "none") }} onSubmit={handleRegister}>
                <div>
                    <input type="text" placeholder="Name" className="w-full rounded-md border-gray-100 p-3 shadow-none mt-4 mb-3" onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <input type="text" placeholder="username" className="w-full rounded-md border-gray-100 p-3 shadow-none mt-4 mb-3" onChange={e => setUserName(e.target.value)} required />
                </div>
                <div>
                    <input type="password" placeholder="password" className="w-full rounded-md border-gray-100 p-3 shadow-none mb-3" onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <input type="text" placeholder="conform password" className="w-full rounded-md border-gray-100 p-3 shadow-none mt-4 mb-3" />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className='rounded-md w-[100px] p-2 bg-green-500'>Register</button>
                </div>


            </form>


        </div>
    );


}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};