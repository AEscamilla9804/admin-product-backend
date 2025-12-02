/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: Product's ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: Product's name
 *                      example: iPhone 15 256GB
 *                  price:
 *                      type: number
 *                      description: Product's price
 *                      example: 749.99
 *                  availability:
 *                      type: boolean
 *                      description: Product's availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Obtain a list with all products
 *          tags:
 *              - Product Operations
 *          description: Returns an array containing all the products from the REST API
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Obtain the data of a product based on its unique ID
 *          tags:
 *              - Product Operations
 *          description: Returns an object containing the specified product's data
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Desired Product's ID
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not Found
 *              400:
 *                  description: Bad Request - Invalid ID
 */

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Product Operations
 *          description: Returns a new product from the REST API
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Razer Kraken Headphones
 *                              price:
 *                                  type: number
 *                                  example: 39.99
 *          responses:
 *              201:
 *                  description: Product Created Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid Input Data
 *                              
 */

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates the information of certain product
 *          tags:
 *              - Product Operations
 *          description: Returns an object with the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Desired Product's ID
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: ASUS TUF Gaming A16
 *                              price:
 *                                  type: number
 *                                  example: 799.99
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Input Data
 *              404:
 *                  description: Not Found
 */

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Updates the availability of certain product
 *          tags:
 *              - Product Operations
 *          description: Returns an object with the updated product availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Desired Product's ID
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Input Data
 *              404:
 *                  description: Not Found
 */

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product
 *          tags:
 *              - Product Operations
 *          description: Returns a confirmation message after deleting the product from the REST API
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Desired Product's ID
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Product Deleted Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              example: Product deleted
 *              400:
 *                  description: Bad Request - Invalid ID or Input Data
 *              404:
 *                  description: Not Found 
 */