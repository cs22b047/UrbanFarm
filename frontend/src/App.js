import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import useToken from './useToken';
import './pages/dashboard.css';
import logo from './assets/logo.png';
import Chatbot from './components/chat-bot';
import PhotoUpload from './components/UploaPhoto';
import ARScene from './components/ARScene';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';


function App() {

  const { token, setToken, deleteToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <nav className="main-nav flex justify-between mx-10">
        <img src={logo} alt="logo.png" className='w-48 my-5'></img>
        <ul class="main-nav-list">
          <li><Link to='/'><a class="main-nav-link" href="#pricing">Dashboard</a></Link></li>
          <li><Link to='/upload_image'><a class="main-nav-link" href="#how">Design Farm</a></Link></li>
          <li><Link to='/ar'><a class="main-nav-link" href="#how">Augumented Reality</a></Link></li>
          <li><Link to='/blogs'><a class="main-nav-link" href="#how">Blogs</a></Link></li>
          <li><button className='border-[1px] w-fit h-fit rounded-md border-black px-4 py-2 bg-green-500 hover:bg-green-400'><a class="text-black text-[14px] no-underline font-bold" href="#clt" onClick={() => deleteToken()}>Log out</a></button></li>
        </ul>
      </nav>
      <div className="w-[400px] z-10 fixed right-0 bottom-0 mr-16">
          <Chatbot></Chatbot>
      </div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/upload_image' element={<PhotoUpload />} />
        <Route path='/ar' element={<ARScene />} />
        <Route path='/blogs' element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </div >
  );
}

export default App;
