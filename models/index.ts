import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const db: any = {};

const { DB_URL } = process.env;

if (!DB_URL) {
  throw new Error(
    "Database URL (DB_URL) is not defined in environment variables."
  );
}

const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: env === "development",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

fs.readdirSync(__dirname)
  .filter((file) => {
    const isModelFile =
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (env === "development" ? file.endsWith(".ts") : file.endsWith(".js")) &&
      !file.includes(".test.js");
    return isModelFile;
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
