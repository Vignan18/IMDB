const { Router } = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Movie = require('../Models/Movie');



router.get("/", async (req, res) => {
    try {
        return res.json(await Movie.find());
    }
    catch (e) {
        console.log(e.message);
    }
})


router.post("/", async (req, res) => {
    const { movieid, name, image, rating, releaseDate, reviews } = req.body;
    try {
        const newData = new Movie({ movieid, name, image, rating, releaseDate, reviews });
        await newData.save();
        return res.json(await Movie.find());
    }
    catch (e) {
        console.log(e.message);
    }
})


router.get("/", async (req, res) => {
    try {
        return res.json(await Movie.find());
    }
    catch (e) {
        console.log(e.message);
    }
})


router.get("/:id", async (req, res) => {
    try {
        const data = await Movie.findOne({ movieid: req.params.id })
        return res.json(data);
    }
    catch (e) {
        console.log(e.message);
    }
})



router.put("/", async (req, res) => {
    const { id, reviews } = req.body;

    Movie.updateOne({ movieid: id }, { $set: { reviews: reviews } }).then(() => {
        res.status(204).send();
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});



module.exports = router;