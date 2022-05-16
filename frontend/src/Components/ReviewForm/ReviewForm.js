import React, { useEffect, useState } from "react";
import Reviews from "../Reviews/Reviews";

const ReviewForm = ({ movie }) => {
  const [rating, setrating] = useState("");
  const [review, setreview] = useState("");
  const [moviereview, setmoviereviews] = useState(movie.reviews);
  const [reviewCount, setreviewCount] = useState(movie.reviews.length);
  const [averageRating, setaverageRating] = useState(movie.averageRating);
  const [user, setuser] = useState("");
  const [rvuser, setrvuser] = useState("");

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

  const presentUser = () => {
    fetch("/api/sessions/me")
      .then((user) => user.json())
      .then((res) => {
        setuser(res.userId);
        console.log("vale", res.userId);
      });
  };

  return (
    <>
      <div className="desc">
        <div className="review-form">
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
        </div>
      </div>

      <div className="reviews category2">
        <h3 className="plot">User Reviews:</h3>
        <Reviews reviews={moviereview} />
      </div>
    </>
  );
};

export default ReviewForm;
