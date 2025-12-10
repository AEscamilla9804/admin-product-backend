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

// Obtaining product ID
describe('GET /api/products/:id', () => {
    it(`Should return an error message (404) if product doesn't exist`, async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Product not found');
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should return an error message for an invalid URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Invalid ID');
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Obtain a JSON response with the specified product', async () => {
        const productId = 1
        const response = await request(server).get(`/api/products/${productId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('error');
    })
})

// Updating a product content
describe('PUT /api/products/:id', () => {
    it('Should return validation messages when updating a product', async () => {
        const productId = 1;
        const response = await request(server).put(`/api/products/${productId}`).send({});

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('Should return an error message when price is equal or lower than 0', async () => {
        const productId = 1
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Headphones Razer Kraken V2",
            price: -200,
            availability: true
        });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Product price must be greater than 0');
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should return an error message (404) for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Headphones Razer Kraken V2",
            price: 19.99,
            availability: true
        });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Product not found')
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should return an error message for an invalid URL', async () => {
        const response = await request(server).put(`/api/products/not-valid-url`).send({
            name: "Headphones Razer Kraken V2",
            price: 19.99,
            availability: true
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Invalid ID');
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    it('Obtain a JSON response with the updated product', async () => {
        const productId = 1
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Headphones Razer Kraken V2",
            price: 19.99,
            availability: true
        });;

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');
    });
})

// Updating product availability
describe('PATCH /api/products/:id', () => {
    it('Should return an error message (404) for non-existent products', async () => {
        const producId = 2000;
        const response = await request(server).patch(`/api/products/${producId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Product not found');
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should return an error message (400) for an invalid URL', async () => {
        const response = await request(server).patch('/api/products/not-valid-url');

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Invalid ID');
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Obtain a JSON response with the updated product (availability)', async () => {
        const producId = 1;
        const response = await request(server).patch(`/api/products/${producId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.availability).toBe(false);
        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('error');
    })
})

// Product Deletion
describe('DELETE /api/products/:id', () => {
    it('Should return an error message (404) for a non-existent product', async () => {
        const productId = 2000;
        const response = await request(server).delete(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Product not found');
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should return an error message for an invalid URL', async () => {
        const response = await request(server).delete(`/api/products/not-valid-url`);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Invalid ID');
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should return a confirmation message once the product is deleted', async () => {
        const productId = 1;
        const response = await request(server).delete(`/api/products/${productId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBe('Product deleted');
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors');
    })
})