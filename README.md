📌 Product Administrator REST API

This document describes the backend of the Product Administrator PERN application, including setup, environment configuration, scripts, API structure, Docker usage, and testing.

🚀 Features

- Toggle product availability (PATCH-like operation)
- Type-safe backend using TypeScript + Express
- Modular architecture (controllers, models, routes, middleware)
- Sequelize ORM with production, development, and testing environments
- Dockerized PostgreSQL setup (3 databases)
- Jest + Supertest automated testing
- API documentation using Swagger UI
- Environment variables via .env
- CORS configuration
- Global error handling middleware
- Request validation using Express Validator

🛠 Tech Stack

- PostgreSQL
- Docker
- Node.js
- Express.js
- TypeScript
- Sequelize ORM
- Jest & Supertest
- Swagger (OpenAPI)

📂 Project Structure

backend/
├── coverage/
├── node_modules/
├── src/
│ ├── __tests__/
│ ├── config/
│ ├── data/
│ ├── docs/
│ ├── handlers/
│ ├── middleware/
│ ├── models/
│ ├── index.ts
│ ├── router.ts
│ └── server.ts
├── .env
├── .gitignore
├── docker-compose.yml
├── jest.config.js
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── tsconfig.test.json

🔧 Environment Variables

Create a .env file in the root of the backend:

DATABASE_URL=
DATABASE_URL_TEST=
CLIENT_URL=

▶️ Installation & Scripts

Install dependencies --> npm install
Development server --> npm run dev
Build TypeScript --> npm run build
Run Tests (Jest + Supertest) --> npm test

🐳 Docker Setup

This backend uses three PostgreSQL databases: production, development, and testing.

Create a docker-compose.yml file and follow the next strucure:

version: '3.9'

services:
# Local dev DB
postgres:
image: postgres:15
container_name: productdb_dev
restart: always
environment:
POSTGRES_USER: admin
POSTGRES_PASSWORD: admin
POSTGRES_DB: productdb_dev
ports:
- "5432:5432"
volumes:
- pgdata:/var/lib/postgresql/data

# Test DB (Jest)
postgres_test:
image: postgres:15
container_name: productdb_test
restart: always
environment:
POSTGRES_USER: admin
POSTGRES_PASSWORD: admin
POSTGRES_DB: productdb_test
ports:
- "5433:5432"
volumes:
- pgdata_test:/var/lib/postgresql/data

volumes:
pgdata:
pgdata_test:

Start PostgreSQL containers --> docker-compose up -d

Srop containers --> docker-compose down

📘 API Documentation (Swagger)

Swagger documentation is automatically generated. 

Once the server is running, head to the followign path to gain access: http://localhost:4000/docs

📡 API Endpoints

Method	            Endpoint	                Description
GET	                /api/products	            Get all products
POST	            /api/products	            Create a new product
GET	                /api/products/:id	        Get product by ID
PUT	                /api/products/:id	        Update a product
PATCH	            /api/products/:id	        Toggle product availability
DELETE	            /api/products/:id	        Delete a product

❗Error Handling

The API returns consistent error codes:

- 200 — Success
- 201 — Created
- 404 — Resource not found
- 500 — Server/database error

Errors are processed through a global error-handling middleware.

🧪 Testing

Automated tests are written using Jest and Supertest.

- Dedicated testing database
- Tests cover success & failure cases
- Run tests with: npm test