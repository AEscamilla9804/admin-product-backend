import request from 'supertest'
import server from '../../server'

// Product Creation (Valid / Invalid Request)
describe('POST /api/products', () => {
    it ('Should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    })

    it('Price should be greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Product Testing",
            price: 0
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(4);
    })

    it('Price should be a number greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Product Testing",
            price: "Not a number"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(4);
    })

    it('Should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "iPhone Testing",
            price: 799.99
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');
    })
})

// Obtaining the Products
describe('GET /api/products', () => {
    it('Should check if url /api/products exists', async () => {
        const response = await request(server).get('/api/products');
        
        expect(response.status).not.toBe(404);
    })

    it('Obtain a JSON repsonse with ALL the products', async () => {
        const response = await request(server).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);
        expect(response.status).not.toHaveProperty('errors');
    })
})