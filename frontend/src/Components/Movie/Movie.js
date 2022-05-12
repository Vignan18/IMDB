import React, { useEffect, useState } from "react";
import Reviews from "../Reviews/Reviews";
import "./movie.css";
import Navbar from "../Navbar/Navbar";


const Movie = ({ movie }) => {
    const [rating, setrating] = useState();
    const [review, setreview] = useState();
    const [moviereview,setmoviereviews] = useState();
    const [loading,setloading] = useState(false);
    const [rerender,setrerender] = useState(false);

    if(!loading && moviereview!==undefined){
        setloading(!loading);
    }


    useEffect(()=> {
        console.log("called");
        fetch(`/api/movies/${movie.movieid}`)
        .then(res => res.json())
        .then(res => {
            console.log(res.reviews);
            setmoviereviews(res.reviews)});
        }
    ,[rerender]);


    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`/api/reviews/${movie.movieid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                rating,
                review
            }),
        }).then(async (res) => {
            if (res.status === 401) {
                console.log("Please login");
            }
            else{
                setrerender(!rerender);
            } 
        })
    }

    return (
        <>
            <div className='desc'>
                <Navbar display={false}/>
                <img src={movie.image} alt="movie"></img>
                <h1>{movie.name}</h1>
                {loading && <Reviews reviews={moviereview} />}
                <form onSubmit={submitHandler}>
                    <div className='rating'>
                        <h3>Your Rating:</h3>
                        <select classname="dropdown" name="rating" onChange={(e) => setrating(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <h3>Review:</h3>
                    <input type="text" placeholder='your review here' onChange={(e) => setreview(e.target.value)}></input>
                    <button type="submit">Post</button>
                </form>
            </div>
        </>
    )

}

export default Movie;