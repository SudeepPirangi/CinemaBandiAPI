const axios = require("axios");
const path = require("path");
const fs = require("fs");
const { v4: uuidV4 } = require("uuid");
const dataJSON = require("../data/movies.json");

const moviesJSONPath = path.join(__dirname, "../data/movies.json");

module.exports = {
  getMovies: () => {
    try {
      let movies = fs.readFileSync(moviesJSONPath);
      movies = JSON.parse(movies);
      // console.log("==> movies", movies);
      return movies;
    } catch (error) {
      console.log("Error while fetching movies", error);
      let newError = new Error("Error while fetching movies");
      newError.data = error;
      throw newError;
    }
  },
  addMovie: (inputData, req) => {
    try {
      let { movie } = inputData;
      const newId = uuidV4();
      movie = { _id: newId, ...movie };
      let movies = JSON.parse(fs.readFileSync(moviesJSONPath));
      movies = [...movies, movie];
      fs.writeFileSync(moviesJSONPath, JSON.stringify(movies));
      movies = JSON.parse(fs.readFileSync(moviesJSONPath));
      // console.log("all movies", movies);
      let responseMovie = movies.find((thisMovie) => thisMovie._id.toString() === newId.toString());
      // console.log("responseMovie", responseMovie);
      return responseMovie;
    } catch (error) {
      console.log("Error while adding a new movie", error);
      let newError = new Error("Error while adding a new movie");
      newError.data = error;
      throw newError;
    }
  },
  updateMovie: (inputData, req) => {
    try {
      let { movie } = inputData;
      let movies = JSON.parse(fs.readFileSync(moviesJSONPath));
      if (movie && movie._id) {
        movies = movies.map((thisMovie) => {
          if (thisMovie._id.toString() === movie._id.toString()) return { ...thisMovie, ...movie };
          return thisMovie;
        });
        fs.writeFileSync(moviesJSONPath, JSON.stringify(movies));
        movies = JSON.parse(fs.readFileSync(moviesJSONPath));
        // console.log("all movies", movies);
        let responseMovie = movies.find((thisMovie) => thisMovie._id.toString() === movie._id.toString());
        // console.log("responseMovie", responseMovie);
        return responseMovie;
      }
      let newError = new Error("Error while updating movie: Invalid data");
      newError.data = movie;
      throw newError;
    } catch (error) {
      console.log("Error while adding a new movie", error);
      let newError = new Error("Error while adding a new movie");
      newError.data = error;
      throw newError;
    }
  },
  deleteMovie: (movieId, req) => {
    let { movieId: newMovieId } = movieId;
    // console.log("==> Received ID to delete", newMovieId);
    let movies = JSON.parse(fs.readFileSync(moviesJSONPath));
    let matchingIndex = movies.findIndex((thisMovie) => thisMovie._id.toString() !== newMovieId);
    if (matchingIndex) {
      // let filteredMovies = movies.filter((thisMovie) => thisMovie._id.toString() !== newMovieId);
      movies.splice(matchingIndex, 1);
      fs.writeFileSync(moviesJSONPath, JSON.stringify(movies));
      return JSON.parse(fs.readFileSync(moviesJSONPath));
    } else {
      console.log(`Unable to delete, no data found with matching id ${newMovieId}`);
      let error = new Error(`Unable to delete, no data found with matching id ${newMovieId}`);
      error.data = newMovieId;
      error.statusCode = 500;
      throw error;
    }
  },
};
