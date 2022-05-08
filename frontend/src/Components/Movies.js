import React from 'react';
import { movies } from './data';
import "./Movies.css";
import { Link } from "react-router-dom";


const Movies = () => {
  const movieDetails = (movieid) => {
    console.log("clicked",movieid);
    <Link to="/MovieDetails" target="_blank" >Services</Link>
  }

  const movieData = movies.map((movie, index) => {
    return (
      <div className="movie" key={movie._id}>
        <span onClick={() => movieDetails(movie._id)}><img className="movieimg"  src={movie.image} alt="" />
        </span>
        <h3>{movie.name}</h3>
        <h3>{movie.rating}</h3>
      </div>
    );
  });
  return <div className="moviecontainer">{movieData}</div>;
}

export default Movies;