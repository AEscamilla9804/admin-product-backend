import { exit } from 'node:process'
import colors from 'colors'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({ force: true });
        console.log(colors.magenta.bold('Data deleted successfully'));
        exit();
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if (process.argv[2] === '--clear') {
    clearDB()
}