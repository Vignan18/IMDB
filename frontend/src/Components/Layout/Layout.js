import React from 'react';
import Login from '../Login/Login';
import './Layout.css';

const Layout = ()=>{
    return (
        <>
        <div className='navbar'>
            <span>IMDB</span>
            <Login/>
        </div>
        </>
    )
}

export default Layout;