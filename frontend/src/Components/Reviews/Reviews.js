import React from "react";


const Reviews = ({ reviews }) => {
   console.log("reviw comp", reviews);

    const movieReviews = reviews.map((rev, index) => {
        return (
            <div key={index}>
                <span>{rev.rating} &#11088;</span>
                <span>{rev.review}</span>
            </div>
        );
    })
    return (
        <>
            <h1>{movieReviews}</h1>
        </>
    )
}

export default Reviews;