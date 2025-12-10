import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv'

dotenv.config()

const isProduction = process.env.NODE_ENV === "production";

const db = new Sequelize(process.env.DATABASE_URL!, {
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