import React, { useState } from "react";



const Movie = ({ movie }) => {
    const [rating, setrating] = useState();
    const [review, setreview] = useState();


    const submitHandler = (e) => {
        e.preventDefault();
        console.log("rating",rating);
        console.log("review",review);
        fetch(`/api/reviews/${movie.movieid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              rating,
              review
            }),
          }).then((res)=>{
              if(res.status == 401){
                  console.log("Please login");
              }
          })
    }

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
                <form onSubmit={submitHandler}>
                    <div className='rating'>
                        <h3>Your Rating:</h3>
                        <select classname="dropdown" name="rating" onChange= {(e)=>setrating(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <h3>Review:</h3>
                    <input type="text" placeholder='your review here' onChange= {(e)=>setreview(e.target.value)}></input>
                    <button type="submit">Post</button>
                </form>
            </div>
        </>
    )

}

export default Movie;