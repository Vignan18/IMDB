import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from './Navbar';
import "./MovieDetails.css"

const MovieDetails = () => {
    const location = useLocation();
    const movie = location.state.links.movie;
    return (
        <>
            <div>
                <Navbar />
                <div className='desc'>
                    <img src={movie.image} alt="movie"></img>
                    <h1>{movie.name}</h1>
                    <span>Rating {movie.rating}</span>
                    <div className='rating'>
                        <h3>Your Rating:</h3>
                        <select classname="dropdown" name="rating">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <h3>Review:</h3>
                    <input type="text" placeholder='your review here'></input>
                    <button>Post</button>
                </div>
            </div>
        </>
    )
}

export default MovieDetails;