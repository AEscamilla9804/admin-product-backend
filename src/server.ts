import express from 'express'
import colors from 'colors'
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

connectDB();

const server = express();

// Body Parsing Middleware
server.use(express.json())

// Testing Route
server.get('/api', (req, res) => {
    res.json('From API')
})

// Routing
server.use('/api/products', router)

export default server