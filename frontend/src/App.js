import React, { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import useToken from './useToken';
function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Hello {token.split('#')[1]}!</h1>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
