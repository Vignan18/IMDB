import React,{useEffect, useState} from 'react';
import "./Search.css"


const Search  = ()=>{
    return (
        <>
        <div className='search'>
             <input id="searchbar"  type="text"
        name="search" placeholder="Search.."></input>
        </div>
        </>
    )
}


export default Search;