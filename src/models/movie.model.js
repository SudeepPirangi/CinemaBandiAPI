const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const movieSchema = new Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  promo: { type: String, required: true },
  year: { type: Number, required: true },
  cast: { type: String, required: true },
  director: { type: String, required: true },
  production: { type: String, required: true },
  music: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  genre: { type: String, required: true },
  language: { type: String, required: true },
  imdb: { type: Number },
});

module.exports = mongoose.model("Movie", movieSchema);
