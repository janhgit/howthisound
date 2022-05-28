import mongoose from 'mongoose';
const { Schema } = mongoose;

const review = new Schema({
  _id: String,
  rating: String,
  reviewText: String,
  liked : Boolean,
  listened: Boolean,
  Date: { type: Date, default: Date.now },
  favTrack: String,
  LeastFavTrack: String
});

module.exports = mongoose.models.Review || mongoose.model('Review', review)