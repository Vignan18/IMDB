const express = require('express');
const router = express.Router();
const Movie = require('../Models/Movie');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');

router.put("/:movieid",auth.authenticate, async (req, res) => {
    const { movieid } = req.params;
    const { rating, review } = req.body;
    const userId = req.session.userId;
    try {
        Movie.findOne({ movieid: movieid }).then(movie => {
            const exisitingUser = movie.reviews.some((review) => review.userId == userId);
          //  console.log(movie);
            
            if (!exisitingUser) {
                movie.reviews.push({ userId, rating: rating, review: review })
                movie.save().then(() => {
                    res.send(movie);
                })
            }
            else {
                Movie.updateOne({
                    "reviews.userId": userId
                },
                    {
                        "$set":
                        {
                            "reviews.$.rating": rating,
                            "reviews.$.review": review
                        }
                    }).then(() => {
                        res.status(204).send(Movie);
                    }).catch((e) => {
                        res.status(500).send({ error: e.message });
                    });  
            }

        })
    }
    catch (e) {
        console.log(e.message);
    }

})


module.exports = router;