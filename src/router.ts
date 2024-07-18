
import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, getProductById, updatedAvailability, updatedProduct } from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();

/**
 * @swagger
 * components: 
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Monitor Curvo de 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 500
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 * 
 * 
 * 
 * 
 */


/**
 * @swagger
 *  /api/products/:
 *         get:
*              summary: Get a list of products 
*              tags: 
*                  - Products
*              description: Return a list of products
*              responses: 
*                   200:
*                       description: Sucessfully response
*                       content: 
*                           application/json:
*                               schema: 
*                                   type: array
*                                   items:
*                                       $ref: '#/components/schemas/Product'
 */

router.get('/', getProduct)


/**
 * @swagger
 *  /api/products/{id} :
 *      get:
*           summary: Get a product by ID
*           tags: 
*               - Products
*           description: Return a product base on its unique ID
*           parameters:
*             - in: path 
*               name: id
*               description: The ID of the product to retrieve 
*               required: true
*               schema: 
*                   type: integer
*           responses:
*               200:
*                   description: Successful Response
*                   content:
*                       application/json:
*                           schema: 
*                               $ref: '#/components/schemas/Product'
*               400:
*                   description: Product not found
*               404:
*                   description: Invalid ID

* 
 * 
 */

router.get('/:id',
    param('id').isInt().withMessage('Id no valido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags: 
 *          - Products
 *      description: Return a new record in the database 
 *      requestBody: 
 *          required: true 
 *          content: 
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: Monitor curvo 49 pulgadas
 *                          price: 
 *                              type: number
 *                              example: 300
 *      responses:
 *          201:
 *              description: Product created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request invalid input data
 */

router.post('/',
    
    // Validation for camps Product 
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Precio no valido'),

    handleInputErrors,
    createProduct 

)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updated a product with user input
 *      tags:
 *          - Products
 *      description: Return the updated product
 *      parameters:
 *        - in: path 
 *          name: id
 *          description: The ID of the product to retrieve 
 *          required: true
 *          schema: 
 *              type: integer
 *      requestBody: 
 *          required: true 
 *          content: 
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: Monitor curvo 49 pulgadas
 *                          price: 
 *                              type: number
 *                              example: 300
 *      responses:
 *          200:
 *              description: Successful response 
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *           
 *          400:
 *              description: Bad request invalid ID or invalid input data
 *          404:
 *              description: Product not Found
 */

router.put('/:id', 
    // Validation for camps Product 
    param('id').isInt().withMessage('Id no valido'),
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Precio no valido'),

    handleInputErrors,
    updatedProduct)

/**
 * @swagger
 *  /api/products/{id}:
 *      patch:
 *          summary: Updated Product availablilty
 *          tags:
 *              - Products 
 *          description: Return the updated product
 *          parameters:
 *                - in: path 
 *                  name: id
 *                  description: The ID of the product to retrieve 
 *                  required: true
 *                  schema: 
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Successful response 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *           
 *              400:
 *                  description: Bad request invalid ID or invalid input data
 *              404:
 *                  description: Product not Found
 */

router.patch('/:id', 
    param('id').isInt().withMessage('Id no valido'),
    handleInputErrors,
    updatedAvailability

)

/**
 * @swagger
 *  /api/products/{id}:
 *      delete:
 *          summary: Delete a product by Id
 *          tags:
 *              - Products 
 *          description: Return a message indicating which product was deleted
 *          parameters:
 *                - in: path 
 *                  name: id
 *                  description: The ID of the product to retrieve 
 *                  required: true
 *                  schema: 
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Successful response 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              values: 'Producto eliminado'
 *           
 *              400:
 *                  description: Bad request invalid ID or invalid input data
 *              404:
 *                  description: Product not Found
 */

router.delete('/:id', 
    param('id').isInt().withMessage('Id no valido'),
    handleInputErrors,
    deleteProduct)

export default router;