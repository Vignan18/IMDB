import React,{useEffect, useState} from 'react';
import Navbar from './Navbar';
import Movies from './Movies';
import Footer from './Footer';

function HomePage() {
  const [movies,setmovies] = useState();

  //get movies using API
  const fetchMovies = ()=>{
    fetch('/movies')
    .then(res=>res.json())
    .then(res=>console.log(res));
  }

  useEffect(()=>{
    //fetchMovies();
  },[])


  return (
    <div className="App">
      <Navbar/>
      <Movies/>
      <Footer/>
    </div>
  );
}

export default HomePage;
