import {Router} from 'express';
import {body, param} from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  uptadeAvailability,
  getProductById,
} from './handlers/products.js';
import {handleInputErrors} from './middleware/index.js';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the product
 *        example: 1
 *      name:
 *        type: string
 *        description: The auto-generated id of the product
 *        example: "Product 1"
 *
 *
 *
 *
 *
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *    summary: Returns the list of all the products
 *    tags:
 *         - Products
 *    description: Returns the list of all the products
 *    responses:
 *     200:
 *      description: Successful response
 *      content:
 *         application/json:
 *          schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/Product'
 */
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *    summary: Returns the product by id
 *    tags:
 *         - Products
 *    description: Returns the product by id
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The auto-generated id of the product
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *     200:
 *         description: Successful response
 *         content:
 *            application/json:
 *               schema:
 *                $ref: '#/components/schemas/Product'
 *     404:
 *         description: Product not found
 *
 *     400:
 *         description: Invalid ID supplied
 *
 */
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Create a new product in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product 1"
 *               price:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad Request Invalid input
 */
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by id
 *     tags:
 *       - Products
 *     description: Update a product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The auto-generated id of the product
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product 1"
 *               price:
 *                 type: number
 *                 example: 100
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request Invalid input
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update availability of a product by id
 *     tags:
 *       - Products
 *     description: Update availability of a product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The auto-generated id of the product
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid ID supplied
 */

//routing

router.get('/', getProduct);
router.get(
  '/:id',
  param('id').isInt().withMessage('invalid ID'),
  getProductById
);
router.post(
  '/',
  body('name').notEmpty().withMessage('Product name is required'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .notEmpty()
    .withMessage('Product name is required')
    .custom(value => value > 0)
    .withMessage('Price must be greater than 0'),
  handleInputErrors,
  createProduct
);

router.put(
  '/:id',
  body('name').notEmpty().withMessage('Product name is required'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .notEmpty()
    .withMessage('Product name is required')
    .custom(value => value > 0)
    .withMessage('Price must be greater than 0'),
  body('availability')
    .isBoolean()
    .withMessage('Availability must be a boolean'),
  handleInputErrors,
  updateProduct
);

router.patch(
  '/:id',
  param('id').isInt().withMessage('invalid ID'),
  handleInputErrors,
  uptadeAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by id
 *     tags:
 *       - Products
 *     description: Delete a product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The auto-generated id of the product
 *         required: true
 *         schema:
 *           type: integer
 *           value: 'Product deleted successfully'
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid ID supplied
 */

router.delete('/:id', handleInputErrors, deleteProduct);
export default router;
