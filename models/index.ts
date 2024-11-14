import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import dotenv from "dotenv";

const basename = path.basename(__filename);

dotenv.config();

const env = process.env.NODE_ENV || "development";
const db: any = {};

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

let sequelize = new Sequelize(DB_DATABASE!, DB_USERNAME!, DB_PASSWORD!, {
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  dialect: "postgres",
  logging: false,
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
