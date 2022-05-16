import React, { useState, useEffect } from 'react';

import Movies from '../Movies/Movies';

import "./HomePage.css";


function HomePage() {
  const [movies, setmovies] = useState();
  const [Loading, setLoading] = useState(false);
  //get movies using API
  if (!Loading && movies) {
    setLoading(true);
  }
  const fetchMovies = () => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(res => setmovies(res));
  }

  useEffect(() => {
    fetchMovies();
  }, [])


  return (
    <div className="App">
      {Loading && <Movies movies={movies} />}
    </div>
  );
}

export default HomePage;
