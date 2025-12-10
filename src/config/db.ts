import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "postgres",
    protocol: "postgres",
    models: [__dirname + '/../models/**/*'],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

export default db