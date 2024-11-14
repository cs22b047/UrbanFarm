import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import useToken from './useToken';
import './pages/dashboard.css';
import Chatbot from './components/chat-bot';
import PhotoUpload from './components/UploaPhoto';
import ARScene from './components/ARScene';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Navbar from './components/Navbar';


function App() {

  const { token, setToken, deleteToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <Navbar deleteToken={deleteToken}></Navbar>

      <div className="w-[80%] md:w-[400px] z-10 fixed md:right-0 right-10 bottom-0 md:mr-16">
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
