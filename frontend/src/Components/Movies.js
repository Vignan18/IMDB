import React from 'react';
import { movies } from './data';
import "./Movies.css";
import { useNavigate } from "react-router-dom";


const Movies = () => {
  const navigate = useNavigate();
  const movieDetails = (movie) => {
    console.log("clicked",movie);
    navigate("/MovieDetails", { state: { links: { movie } } });
  }

  const movieData = movies.map((movie, index) => {
    return (
      <div className="movie" key={movie._id}>
        <span onClick={() => movieDetails(movie)}><img className="movieimg"  src={movie.image} alt="" />
        </span>
        <h3>{movie.name}</h3>
        <h3>{movie.rating}</h3>
      </div>
    );
  });
  return <div className="moviecontainer">{movieData}</div>;
}

export default Movies;