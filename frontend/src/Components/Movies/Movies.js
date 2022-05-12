import React from 'react';
import "./Movies.css";
import { useNavigate } from "react-router-dom";


const Movies = ({movies}) => {
  const navigate = useNavigate();
  const movieDetails = (id) => {
    navigate(`../movie/${id}`, { state: { links: { id } } });
  }

  const movieData = movies.map((movie) => {
    return (
      <div className="movie" key={movie.movieid}>
        <span onClick={() => movieDetails(movie.movieid)}><img className="movieimg"  src={movie.image} alt="" />
        </span>
        <h3 className='moviename'>{movie.name}</h3>
        <h3 className='moviename'>Rating : {movie.Rating} &#11088;</h3>
        <h5 className='moviename'>Release Date: {movie.releaseDate}</h5>
      </div>
    );
  });
  return <div className="moviecontainer">{movieData}</div>;
}

export default Movies;