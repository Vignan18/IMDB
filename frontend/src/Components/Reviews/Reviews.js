import React from "react";
import "./Reviews.css";

const Reviews = ({ userId,reviews, movieId,fetchupdatedReviews }) => {
    const deleteReview = ()=>{
        const data = {
             "movieId" :movieId,
             "userId" : userId
         }
         fetch('/api/reviews/me',{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
         }).then((response) => {
             if(response.status === 204){
                 console.log("deleted successfully");
                fetchupdatedReviews();
             }
             else if(response.status === 401){
                 console.log('Login failed');    
             }
         }).catch((err) => {
             console.log(err);
         })
    }


    const movieReviews = reviews.map((rev, index) => {
        return (
            <ul key={index}>
                <li>
                <span>{rev.rating}&#11088;-</span>
                <span>{rev.review}</span>
                {rev.userId === userId && <button onClick={deleteReview}>Delete</button>}
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