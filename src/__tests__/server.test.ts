import request from 'supertest'
import server, { connectDB } from '../server'
import db from '../config/db'

describe('GET /api', () => {
    it('Should send back a JSON response', async () => {
        const res = await request(server).get('/api');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toBe('From API')

        expect(res.status).not.toBe(404);
        expect(res.body).not.toBe('From api');
    })
})

jest.mock('../config/db');

describe('connectDB', () => {
    it('Should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Error connecting to the Database'))

        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error connecting to the Database')
        )
    })
})