import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const Navbar = (props) => {
    const [nav, setNav] = useState(false);
    const location = useLocation(); // Hook to get the current path

    // Toggle function to handle the navbar's display
    const handleNav = () => {
        setNav(!nav);
    };

    // Array containing navigation items
    const navItems = [
        { id: 1, text: 'Dashboard', path: '/' },
        { id: 2, text: 'Design Farm', path: '/upload_image' },
        { id: 3, text: 'Augmented Reality', path: '/ar' },
        { id: 4, text: 'Blogs', path: '/blogs' },
    ];

    return (
        <div className='flex bg-white z-30 fixed top-0 w-full justify-between items-center h-24 text-black'>
            {/* Logo */}
            <img src={logo} alt="logo.png" className='w-48 mx-4 my-5' />

            {/* Desktop Navigation */}
            <ul className='hidden list-none md:flex'>
                {navItems.map((item) => (
                    <Link to={item.path} className='no-underline text-black' key={item.id}>
                        <li
                            className={`p-4 w-fit rounded-xl m-2 cursor-pointer duration-300 ${location.pathname === item.path ? 'text-green-500 font-bold' : 'hover:text-green-500'
                                }`}
                        >
                            {item.text}
                        </li>
                    </Link>
                ))}
                <li
                            className={`p-4 w-fit rounded-xl cursor-pointer duration-300`}
                    onClick={() => props.deleteToken()}
                >
                    <FontAwesomeIcon icon={faUser} size='lg' className='mx-2 mt-1'></FontAwesomeIcon>
                    {/* <button className="px-4 py-2 bg-red-500 text-black border-[1px] font-semibold rounded-lg hover:bg-red-600">

                        Log out

                    </button> */}
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
                <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>UrbanFarm</h1>

                {/* Mobile Navigation Items */}
                {navItems.map((item) => (
                    <Link to={item.path} className='no-underline text-white' key={item.id}>
                        <li
                            className={`p-4 w-fit rounded-xl m-2 cursor-pointer duration-300 ${location.pathname === item.path ? 'bg-green-500 text-black' : 'hover:bg-green-500'
                                }`}
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
