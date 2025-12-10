import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv'

dotenv.config()

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("DATABASE_URL_TEST:", process.env.DATABASE_URL_TEST);

const isProduction = process.env.NODE_ENV === "production";

const databaseUrl = process.env.NODE_ENV === "test"
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL not set for environment: " + process.env.NODE_ENV);
}

const db = new Sequelize(databaseUrl!, {
    dialect: "postgres",
    models: [__dirname + '/../models/**/*'],
    logging: false,
    dialectOptions: isProduction
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
        : {}
});

export default db