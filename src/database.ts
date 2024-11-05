const { Pool } = require("pg");
import * as dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = new Pool({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  database: DB_DATABASE,
});
export const db = {
  query: (text: any, params: any) => pool.query(text, params),
};
