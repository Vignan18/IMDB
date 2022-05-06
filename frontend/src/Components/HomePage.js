import React,{useEffect, useState} from 'react';


function HomePage() {
  const [movies,setmovies] = useState();

  //get movies using API
  const fetchMovies = ()=>{
    fetch('/movies')
    .then(res=>res.json())
    .then(res=>console.log(res));
  }

  useEffect(()=>{
    fetchMovies();
  },[])


  return (
    <div className="App">
      
    </div>
  );
}

export default HomePage;
