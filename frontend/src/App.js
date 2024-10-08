import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import useToken from './useToken';
import Photo3DModel from './components/Photo3DModel';
function App() {

  const { token, setToken, deleteToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Hello {token.split('#')[1]}!</h1>
      <button onClick={() => deleteToken()}>logout</button>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/upload_image' element={<Photo3DModel />} />
      </Routes>
    </div>
  );
}

export default App;
