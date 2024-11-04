import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const sequelize = new Sequelize(
  DB_DATABASE!,
  DB_USERNAME!,
  DB_PASSWORD!,
  {
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    dialect: "postgres",
  }
);
