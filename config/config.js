require("dotenv").config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;
module.exports = {
  development: {
    username: DB_USERNAME,
    port: DB_PORT,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    environment: NODE_ENV,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    port: DB_PORT,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    environment: NODE_ENV,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    port: DB_PORT,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    environment: NODE_ENV,
    dialect: "postgres",
  },
};
