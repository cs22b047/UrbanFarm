import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import useToken from './useToken';
import './pages/dashboard.css';
import logo from './assets/logo.jpeg';
import Chatbot from './components/chat-bot';
import PhotoUpload from './components/UploaPhoto';
import ARScene from './components/ARScene';


function App() {

  const { token, setToken, deleteToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <nav className="main-nav flex justify-between mx-10">
        <img src={logo} className='w-32 my-5'></img>
        <ul class="main-nav-list">
          <li><Link to='/'><a class="main-nav-link" href="#pricing">Dashboard</a></Link></li>
          <li><Link to='/upload_image'><a class="main-nav-link" href="#how">Design Farm</a></Link></li>
          <li><Link to='/ar'><a class="main-nav-link" href="#how">Augumented Reality</a></Link></li>
          <li>
            <a class="main-nav-link" href="#testimonials">Blog</a>
          </li>
          <li><a class="main-nav-link nav-cta" href="#clt"onClick={() => deleteToken()}>Log out</a></li>
        </ul>
      </nav>
      <div className="w-[400px] z-10 fixed right-0 bottom-0 mr-20">
                <Chatbot></Chatbot>
      </div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/upload_image' element={<PhotoUpload />} />
        <Route path='/ar' element={<ARScene />} />
      </Routes>
    </div >
  );
}

export default App;
