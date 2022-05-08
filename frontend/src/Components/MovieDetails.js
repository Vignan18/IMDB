import React from 'react';
import { useLocation } from "react-router-dom";


const MovieDetails = ()=>{
    const location = useLocation();
    const movieId = location.state.links.movieid;
    return (
        <>
            <div>
                <h1>something {movieId}</h1>
            </div> 
        </>
    )
}

export default MovieDetails;