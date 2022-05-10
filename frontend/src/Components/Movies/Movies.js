import React from 'react';
import "./Movies.css";
import { useNavigate } from "react-router-dom";


const Movies = ({movies}) => {
  const navigate = useNavigate();
  const movieDetails = (id) => {
    navigate("../FetchMovieDetails", { state: { links: { id } } });
  }

  const movieData = movies.map((movie, index) => {
    return (
      <div className="movie" key={movie.movieid}>
        <span onClick={() => movieDetails(movie.movieid)}><img className="movieimg"  src={movie.image} alt="" />
        </span>
        <h3>{movie.name}</h3>
        <h3>{movie.rating}</h3>
      </div>
    );
  });
  return <div className="moviecontainer">{movieData}</div>;
}

export default Movies;