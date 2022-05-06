const express = require('express');
const router = express.Router();
const Movie = require('../Models/Movie');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');

router.put("/:movieid",async (req,res)=>{
    const {movieid} = req.params;
    const {rating,review} = req.body;
    const userId = req.session.userId;
    try{
        Movie.findOne({_id:movieid}).then(movie=>{
        const exisitingUser =  movie.reviews.some((review) => review.userId == userId);
        if(!exisitingUser){
            console.log("reviews",movie.reviews);      
            movie.reviews.push({userId,rating:rating,review:review})
            movie.save().then(()=>{
                res.send(movie);
            })
        } 
         else{
             Movie.updateOne({
                "reviews.userId":userId
            },
            {
               $set:
                   {
                   "reviews.$.rating":rating,
                   "reviews.$.review":review
               }
            }).then(() => {
                        res.status(204).send();
                    }).catch((e) => {
                        console.log(e.message);
                        res.status(500).send({ error: "Internal Server Error" });
            });
         }

        })
}
    catch(e){
        console.log(e.message);
    }

})

module.exports = router;