const express = require('express');
const router = express.Router();
const Movie = require('../Models/Movie');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');

router.put("/:movieid",auth.authenticate, async (req, res) => {

    const updateRatingReviews = (movie,exisitingRating,reviewCount)=>{
        console.log("movie rating count",movie.ratingCount);
        console.log("average rating",movie.averageRating);
        console.log("existing rating",exisitingRating);
        console.log("current rating",rating);
        console.log("review count",reviewCount);

        let totalRating = (parseInt(parseInt(movie.ratingCount) * parseInt(movie.averageRating)) - parseInt(exisitingRating) + parseInt(rating))/movie.ratingCount;
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
                console.log("exisiting rating",exisitingRating);
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