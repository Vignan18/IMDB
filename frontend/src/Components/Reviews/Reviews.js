import React from "react";
import "./Reviews.css";

const Reviews = ({ reviews }) => {
   console.log("reviw comp", reviews);

    const movieReviews = reviews.map((rev, index) => {
        return (
            <div key={index}>
                <span>{rev.rating}&#11088;-</span>
                <span>{rev.review}</span>
            </div>
        );
    })
    return (
        <>
        <div className="reviews">
            <h3>{movieReviews}</h3>
            </div>
        </>
    )
}

export default Reviews;