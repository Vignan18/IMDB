import React, { useEffect, useState,useContext } from "react";
import Reviews from "../Reviews/Reviews";
import "./movie.css";
import {userStatusConext} from "../Login/Login";
import "../HomePage/HomePage.css";

const Movie = ({ movie }) => {
  const userStatus = useContext(userStatusConext);
  console.log("user status",userStatus);
  const [rating, setrating] = useState("");
  const [review, setreview] = useState("");
  const [moviereview, setmoviereviews] = useState(movie.reviews);
  const [overview, setoverview] = useState();
  const [poster, setposter] = useState();
  const [reviewCount, setreviewCount] = useState(movie.reviews.length);
  const [averageRating, setaverageRating] = useState(movie.averageRating);
  const [userId,setuserId] = useState('');
  const [rvuser,setrvuser] = useState('');
  const [addreview,setaddreview] = useState(false);

  console.log("movies reviews length", movie.reviews.length);

  const clearForm = () => {
    setrating("Rate");
    setreview("");
  };

  const fetchupdatedReviews = () => {
    fetch(`/api/movies/${movie.movieid}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("movie details=", res);
        setrating("Rate");
        setaverageRating(res.averageRating);
        setreviewCount(res.ratingCount);
        setmoviereviews(res.reviews);
      });
  };

  const movieInfo = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.movieid}?api_key=04c35731a5ee918f014970082a0088b1`
    )
      .then((res) => res.json())
      .then((res) => {
        const image = "https://image.tmdb.org/t/p/w1280/" + res.poster_path;
        setposter(image);
        setoverview(res.overview);
      });
  };

  const presentUser = () => {
    fetch("/api/sessions/me")
    .then((user) => user.json())
    .then((res)=>{
      setuserId(res.userId);
      setaddreview(true);
      console.log("vale",res.userId)
    }).catch((e)=>{
      console.log(e.message);
    })
    
  };

  useEffect(() => {
    movieInfo();
    presentUser();
  }, []);





  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`/api/reviews/${movie.movieid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating,
        review,
      }),
    })
      .then(async (res) => {
        if (res.status === 401) {
          console.log("Please login");
        } else {
          clearForm();
          fetchupdatedReviews();
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <>
      <div className="desc">
        <div className="main-content">
          <h1>{movie.name}</h1>
          <img className="posterimage" src={poster} alt="movie"></img>
        </div>
        <div className="story">
          <h3 className="plot">Storyline:</h3>
          <p> {overview}</p>
        </div>

        <div className="sub-content">
          <div className="category1">
            <p>
              <b>Release Date</b>: {movie.releaseDate}
            </p>
            <p>
              <b>Average Rating</b>: {averageRating}&#11088;
            </p>
            <p>
              <b> Rating Count</b>: {reviewCount}
            </p>

            {addreview ? <div className="review-form">
              <form onSubmit={submitHandler}>
                <div className="rating">
                  <div className="rate">
                    <span>Your Rating & Review:</span>
                    <select
                      classname="dropdown"
                      name="rating"
                      onChange={(e) => setrating(e.target.value)}
                    >
                      <option value="Rate">Rate</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="review">
                    <textarea
                      className="reviewbox"
                      type="text"
                      placeholder="your review here"
                      onChange={(e) => setreview(e.target.value)}
                    ></textarea>
                    <br></br>
                    <button type="submit">Post</button>
                  </div>
                </div>
              </form>
            </div>:
            <div class="userlogin">
                <p>Please login to give review</p>
              </div>
            }
          </div>
  

          <div className="reviews category2">
            <h3 className="plot">User Reviews:</h3>
            <Reviews fetchupdatedReviews={fetchupdatedReviews} movieId={movie.movieid} userId={userId} reviews={moviereview} />
          </div>
        </div>
      </div>
      {/* <hr className="line footer"></hr>
      <Footer /> */}
    </>
  );
};

export default Movie;
