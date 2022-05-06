const express = require('express');
const router = express.Router();
const Movie = require('../Models/Movie');
const auth = require('../middlewares/auth');

router.put("/:movieid",async (req,res)=>{
    const {movieid} = req.params;
    const {reviews} = req.body;
    const userId = req.session.userId;
    console.log("userId",userId);
    try{
        const movieData = await Movie.findById(movieid);
        const exisitingUser =  movieData.reviews.some((review) => review.userId == userId);
        console.log("exisiting user",exisitingUser);
        if(!exisitingUser){
            console.log("reviews",movieData.reviews);
           await movieData.reviews.push({
               userId,
               rating:reviews.rating,
                review:reviews.review
           })
           res.status(204).send();
       
        } 
        // // User already given review and rating
         else{
             //loop a particular user 3
             //id -> 


             let userIndex = movieData.reviews.findIndex((a) => a.userId == userId);
             console.log(movieData.reviews[userIndex]);
            await movieData.updateOne({
                 "reviews.userId":userId
             },

             
             {
                $set:{
                    "reviews.$.userId":userId,
                    "reviews.$.rating":reviews.rating,
                    "reviews.$.review":reviews.review
                }
             }).then(() => {
                        res.status(204).send();
                    }).catch(() => {
                        res.status(500).send({ error: "Internal Server Error" });
            });
             
         //  console.log(movieData.findOne({"reviews.userid":userId}))
        //    await movieData.updateOne({ "reviews.userId" : userId }, {$set:{reviews:reviews}}).then(() => {
        //         res.status(204).send();
        //     }).catch(() => {
        //         res.status(500).send({ error: "Internal Server Error" });
        //     });
         }
        
        
    // }
}
    catch(e){
        console.log(e.message);
    }

})

module.exports = router;