import React from "react";



const Movie = ({ movie }) => {
    console.log(movie.reviews);
    const movieData = movie.reviews.map((rev, index) => {
        return (
            <div key={index}>
                <span>{rev.rating}</span>
                <span>{rev.review}</span>
            </div>
        );
    })

    return (
        <>
            <div className='desc'>
                <img src={movie.image} alt="movie"></img>
                <h1>{movie.name}</h1>
                <h1>{movieData}</h1>
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
        </>
    )

}

export default Movie;