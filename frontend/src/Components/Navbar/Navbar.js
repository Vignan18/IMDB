import React from 'react';
import Search from '../Search/Search';
import Login from '../Login/Login';
import './Navbar.css';

const Navbar = ()=>{
    return (
        <>
        <div className='navbar'>
            <span>IMDB</span>
            <Search/>
            <Login/>
        </div>
        </>
    )
}

export default Navbar;