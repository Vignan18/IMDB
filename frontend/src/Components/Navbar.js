import React,{useEffect, useState} from 'react';
import Search from './Search';
import Login from './Login';
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