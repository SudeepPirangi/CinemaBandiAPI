const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const dotenv = require("dotenv").config({ debug: process.env.DEBUG });
const mongoose = require("mongoose");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");
const { MONGO_CONNECTION_STRING } = require("./constants");

if (dotenv.error) console.log("==> dotenv error", dotenv.error);
// console.log("==> debug dotenv", dotenv.parsed);

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const ADMINS = process.env.ADMINS;

const app = express();

// setting up cors
app.use(cors({ origin: "*" }));

// Authorization middleware
app.use((req, res, next) => {
  if (ENV?.toLowerCase() === "development") return next();
  if (ADMINS && ADMINS.length > 0) {
    const adminsList = ADMINS.split(",");
    const emailHeader = req.headers.email;
    if (adminsList.includes(emailHeader)) return next();
  }
  res.status(401).send({
    status: 401,
    message: "Access denied",
    data: "Request is not authorized",
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn: (error) => {
      if (!error.originalError) {
        return error;
      }
      return {
        status: error.originalError.statusCode || 500,
        message: error.originalError.message,
        data: error.originalError.data,
      };
    },
  })
);

app.get("/", (req, res, next) => {
  res.send("Hello World! GraphQL welcomes you. Please visit the endpoint /graphql to proceed");
});

mongoose
  .connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      if (ENV === "development") console.log(`GraphQL server listening on http://localhost:${PORT} in ${ENV} Environment`);
      if (ENV?.toLowerCase() === "production") console.log(`GraphQL server listening on port ${PORT} in ${ENV} Environment`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error", error);
  });
