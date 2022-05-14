import React from "react";
import "./Reviews.css";

const Reviews = ({ reviews }) => {
    const movieReviews = reviews.map((rev, index) => {
        return (
            <ul key={index}>
                <li>
                <span>{rev.rating}&#11088;-</span>
                <span>{rev.review}</span>
                </li>
            </ul>
        );
    })
    return (
        <>
        <div className="reviews">
            <h3>{movieReviews.reverse()}</h3>
            </div>
        </>
    )
}

export default Reviews;