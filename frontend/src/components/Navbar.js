import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


const Navbar = (props) => {
    // State to manage the navbar's visibility
    const [nav, setNav] = useState(false);

    // Toggle function to handle the navbar's display
    const handleNav = () => {
        setNav(!nav);
    };
    {/* <nav className="main-nav flex justify-between mx-10">
        <img src={logo} alt="logo.png" className='w-48 my-5'></img>
        <ul class="main-nav-list">
          <li><Link to='/'><a class="main-nav-link" href="#pricing">Dashboard</a></Link></li>
          <li><Link to='/upload_image'><a class="main-nav-link" href="#how">Design Farm</a></Link></li>
          <li><Link to='/ar'><a class="main-nav-link" href="#how">Augumented Reality</a></Link></li>
          <li><Link to='/blogs'><a class="main-nav-link" href="#how">Blogs</a></Link></li>
          <li><button className='border-[1px] w-fit h-fit rounded-md border-black px-4 py-2 bg-green-500 hover:bg-green-400'><a class="text-black text-[14px] no-underline font-bold" href="#clt" onClick={() => deleteToken()}>Log out</a></button></li>
        </ul>
      </nav> */}
    // Array containing navigation items
    const navItems = [
        { id: 1, text: 'Dashboard', path: '/' },
        { id: 2, text: 'Design Farm', pat: '/upload_image' },
        { id: 3, text: 'Augumented Reality', path: '/ar' },
        { id: 4, text: 'Blogs', path: 'blogs' },
    ];

    return (
        <div className='flex bg-white z-30 fixed top-0 w-full  justify-between items-center h-24 text-black'>
            {/* Logo */}
            <img src={logo} alt="logo.png" className='w-48 mx-4 my-5'></img>

            {/* Desktop Navigation */}
            <ul className='hidden list-none md:flex'>
                {navItems.map(item => (
                    <Link to={item.path} className='no-underline text-black '>
                        <li
                            key={item.id}
                            className='p-4 w-fit hover:bg-green-500 rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
                        >

                            {item.text}
                        </li>
                    </Link>

                ))}
                <li
                    className='p-4 w-fit hover:bg-red-400 rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
                    onClick={() => props.deleteToken()}
                >
                    Log out
                </li>
            </ul>

            {/* Mobile Navigation Icon */}
            <div onClick={handleNav} className='mx-4 md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/* Mobile Navigation Menu */}
            <ul
                className={
                    nav
                        ? 'fixed md:hidden left-0 z-50 top-0 w-[60%] list-none mt-0 text-white h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
                        : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
                }
            >
                {/* Mobile Logo */}
                <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>

                {/* Mobile Navigation Items */}
                {navItems.map(item => (

                    <Link to={item.path} className='no-underline text-white '>
                        <li
                            key={item.id}
                            className='p-4 w-fit hover:bg-green-500 rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
                        >

                            {item.text}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Navbar;