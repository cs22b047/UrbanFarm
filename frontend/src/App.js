import React, { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';

function App() {

  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Routes>
        <Route path='dashboard/' element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
