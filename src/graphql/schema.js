const { buildSchema } = require("graphql");

module.exports = buildSchema(`

  input InputMovie {
    _id: ID!
    title: String!
    poster: String!
    promo: String!
    year: Int!
    cast: String!
    director: String!
    production: String!
    music: String!
    description: String!
    category: String!
    genre: String!
    language: String!
    imdb: Float
  }

  type Movie {
    _id: ID!
    title: String!
    poster: String!
    promo: String!
    year: Int!
    cast: String!
    director: String!
    production: String!
    music: String!
    description: String!
    category: String!
    genre: String!
    language: String!
    imdb: Float
  }

  type RootQuery {
    getMovies: [Movie]
  }

  type RootMutation {
    addMovie(movie: InputMovie!): Movie!
    updateMovie(movie: InputMovie!): Movie!
    deleteMovie(movieId: ID!): [Movie]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
