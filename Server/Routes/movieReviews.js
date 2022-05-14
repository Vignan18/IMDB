const express = require('express');
const router = express.Router();
const Movie = require('../Models/Movie');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');

router.put("/:movieid",auth.authenticate, async (req, res) => {

    const updateRatingReviews = (movie,exisitingRating,reviewCount)=>{
        let totalRating = (parseInt(movie.ratingCount * movie.averageRating) - parseInt(exisitingRating) + parseInt(rating))/2;
        movie.averageRating = totalRating;
        console.log(movie.averageRating);
        movie.ratingCount = movie.ratingCount + reviewCount;
    }


    const { movieid } = req.params;
    const { rating, review } = req.body;
    const userId = req.session.userId;
    let exisitingRating = 0, reviewCount = 0;


    try {
        Movie.findOne({ movieid: movieid }).then(movie => {
            const exisitingUser = movie.reviews.some((review) => review.userId == userId);
            if (!exisitingUser) {
                reviewCount = 1;
                updateRatingReviews(movie,exisitingRating,reviewCount);
                movie.reviews.push({ userId, rating: rating, review: review })
                movie.save().then(() => {
                    res.send(movie.reviews);
                })
            }
            else {
                let userIndex = movie.reviews.findIndex((a) => a.userId == userId);
                exisitingRating =  movie.reviews[userIndex].rating;
                updateRatingReviews(movie,exisitingRating,reviewCount);
                 Movie.updateOne({
                    "movieid":movieid,
                    "reviews.userId": userId
                },
                    {
                        "$set":
                        {
                            "reviews.$.rating": rating,
                            "reviews.$.review": review
                        }
                    }).then(() => {
                        movie.save();
                         res.status(204).send(movie.reviews);
                    }).catch((e) => {
                        movie.save();
                         res.status(500).send(movie.reviews);
                    });  
            }
          
        })
    }
    catch (e) {
        console.log(e.message);
    }

})



module.exports = router;