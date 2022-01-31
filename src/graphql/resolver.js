const MovieModel = require("../models/movie.model");

module.exports = {
  getMovies: async () => {
    try {
      let movies = await MovieModel.find();
      // console.log("==> movies", movies);
      return movies;
    } catch (error) {
      console.log("Error while fetching movies", error);
      let newError = new Error("Error while fetching movies");
      newError.data = error;
      throw newError;
    }
  },
  getSingleMovie: async (inputData, req) => {
    try {
      let { movieId } = inputData;
      // console.log("==> input received for getSingleMovie", movieId);
      let mongoResponse = await MovieModel.findById(movieId);
      // console.log("==> Get Single Movie MongoResponse", mongoResponse);
      return mongoResponse;
    } catch (error) {
      console.log(`Error while getting a movie with id ${movieId}`, error);
      let newError = new Error(`Error while getting a movie with id ${movieId}`);
      newError.data = error;
      throw newError;
    }
  },
  addMovie: async (inputData, req) => {
    try {
      let { movie } = inputData;
      const MovieInstance = new MovieModel(movie);
      let mongoResponse = await MovieInstance.save();
      // console.log("==> Add Movie MongoResponse", mongoResponse);
      return mongoResponse;
    } catch (error) {
      console.log("Error while adding a new movie", error);
      let newError = new Error("Error while adding a new movie");
      newError.data = error;
      throw newError;
    }
  },
  updateMovie: async (inputData, req) => {
    try {
      let { movie } = inputData;
      // console.log("==> input received for update", movie);
      await MovieModel.findByIdAndUpdate(movie._id, { ...movie });
      let mongoResponse = await MovieModel.findById(movie._id);
      // console.log("==> Update Movie MongoResponse", mongoResponse);
      return mongoResponse;
    } catch (error) {
      console.log("Error while updating a new movie", error);
      let newError = new Error("Error while updating a new movie");
      newError.data = error;
      throw newError;
    }
  },
  deleteMovie: async (movieId, req) => {
    try {
      let { movieId: newMovieId } = movieId;
      // console.log("==> Received ID to delete", newMovieId);
      let deleteResponse = await MovieModel.deleteOne({ _id: newMovieId });
      // console.log("==> Delete Response", deleteResponse);
      return {
        statusCode: 200,
        message: `Deleted Count ${deleteResponse.deletedCount}`,
        data: JSON.stringify(deleteResponse),
      };
    } catch (error) {
      console.log("Error while deleting a new movie", error);
      let newError = new Error("Error while deleting a new movie");
      newError.data = error;
      throw newError;
    }
  },
};
