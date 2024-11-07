import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
// @ts-ignore
import { User } from "../models/user";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: NODE_ENV === "dev",
  logging: NODE_ENV === "dev",
  entities: [User],
  migrations: [__dirname + "/migrations/*.js"],
  subscribers: [],
});
