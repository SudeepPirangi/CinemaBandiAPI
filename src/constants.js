const ENV = process.env;

const devConstants = {
  MONGO_CONNECTION_STRING: `mongodb://${ENV.MONGODB_HOST}:${ENV.MONGODB_PORT}/${ENV.MONGODB_DATABASE}`,
};

const prodConstants = {
  MONGO_CONNECTION_STRING: `mongodb+srv://${ENV.MONGODB_USERNAME}:${ENV.MONGODB_PASSWORD}@${ENV.MONGODB_HOST}/${ENV.MONGODB_DATABASE}`,
};

module.exports = ENV.NODE_ENV === "development" ? { ...devConstants } : { ...prodConstants };
