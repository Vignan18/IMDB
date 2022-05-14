import React, { useEffect, useState } from "react";
import Reviews from "../Reviews/Reviews";
import "./movie.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "../HomePage/HomePage.css";

const Movie = ({ movie }) => {
    const [rating, setrating] = useState();
    const [review, setreview] = useState();
    const [moviereview,setmoviereviews] = useState(movie.reviews);
    const [overview,setoverview] = useState();
    const [poster,setposter] = useState();
    const [reviewCount,setreviewCount] = useState(movie.reviews.length);
    const [averageRating,setaverageRating] = useState(movie.averageRating);

    console.log("movies reviews length",movie.reviews.length);

    const fetchupdatedReviews = ()=>{
        fetch(`/api/movies/${movie.movieid}`)
        .then(res => res.json())
        .then(res => {
            console.log("movie details=",res);
            setaverageRating(res.averageRating);
            setreviewCount(res.ratingCount);
            setmoviereviews(res.reviews); 
        }
    )
    }

    useEffect(()=>{

        fetch(`https://api.themoviedb.org/3/movie/${movie.movieid}?api_key=04c35731a5ee918f014970082a0088b1`)
        .then(res=>res.json())
        .then(res=>{
            const image = "https://image.tmdb.org/t/p/w1280/"+res.poster_path;
            setposter(image);
            setoverview(res.overview);
        })
    },[])


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
                fetchupdatedReviews();
            } 
        }).catch((e)=>{
            console.log(e.message);
        })
    }

    return (
        <>
            <div className="desc">
                <Navbar display={false}/>
                <div>
                <h1>{movie.name}</h1>
                <img className="posterimage" src={poster} alt="movie" ></img>
                <h3>Plot:</h3>
                <p> {overview}</p>
                <p><b>Release Date</b>: {movie.releaseDate}</p>
                <p><b>Average Rating</b>: {averageRating}</p>
                <p><b> Rating Count</b>: {reviewCount}</p>
                </div>
               <div className="review-form">
                <form onSubmit={submitHandler}>
                    <div className='rating'>
                        <h3>Your Rating:</h3>
                        <select classname="dropdown" name="rating" onChange={(e) => setrating(e.target.value)}>
                            <option value="Rate">Rate</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <h3>Review:</h3>
                    <textarea  type="text" placeholder='your review here' onChange={(e) => setreview(e.target.value)}></textarea >
                    <br></br>
                    <button type="submit" >Post</button>
                </form>
                <div className="reviews">
                <h1>User Reviews:</h1>
                <Reviews reviews={moviereview} />
                </div>
                </div>
                
            </div>
            <hr className="line"></hr>
            <Footer/>
        </>
    )

}

export default Movie;