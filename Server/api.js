const express = require('express');
const router = express.Router();

const users = require('./Routes/users');
const sessions = require('./Routes/sessions');
const movies = require('./Routes/movies');
const movieReviews = require('./Routes/movieReviews');

// Add json and urlencoded middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/users', users);

router.use('/sessions', sessions);

router.use('/movies',movies);

router.use("/reviews",movieReviews);

module.exports = router;