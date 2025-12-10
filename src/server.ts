import express from 'express'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router from './router';
import db from './config/db';

// Connection with the database
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.blue.bold('Successful connection to the DB'));
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold('Error connecting to the Database'));
    }
}

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const server = express();

// CORS Config
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if (process.env.NODE_ENV === 'test') {
            callback(null, true); // allow Supertest
            return;
        }

        if (!origin) return callback(null, true);

        if (origin === process.env.CLIENT_URL) {
            callback(null, true);
        } else {
            callback(new Error('CORS Error'));
        }
    }
}

server.use(cors(corsOptions));

// Body Parsing Middleware
server.use(express.json())

// Morgan logging
server.use(morgan('dev'));

// Routing
server.use('/api/products', router)

// API Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server