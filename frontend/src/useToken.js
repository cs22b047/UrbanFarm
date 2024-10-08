import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token')
        var userToken
        if (tokenString) userToken = JSON.parse(tokenString);
        return userToken
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    const deleteToken = () => {
        sessionStorage.removeItem('token');
        setToken(null);
    };

    return {
        setToken: saveToken,
        token,
        deleteToken
    }
}