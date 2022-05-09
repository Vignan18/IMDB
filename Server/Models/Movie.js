const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  movieid:String,
  name: String,
  image: String,
  releaseDate:String,
  reviews: [{ userId: mongoose.ObjectId, rating: Number, review: String }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})
//filename,schema
module.exports = mongoose.model('Movie', movieSchema);