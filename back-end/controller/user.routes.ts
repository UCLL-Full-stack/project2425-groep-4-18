/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            firstname:
 *              type: string
 *            password:
 *              type: string
 *            role:
 *              type: string
 * 
 */



import express, { Request, Response,NextFunction } from 'express';
import userservice from '../service/user.service';
import { UserInput } from '../types';
const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: The list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */



userRouter.get('/', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
try {
    const { role,firstname } = req.auth;
    const users = await userservice.getAllUsers({role,firstname});
    res.json(users);
  } catch (error) {
    next(error);
    
  }
});



/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: The user description by id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *
 */

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userservice.getUserById({id: id});
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/register:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some parameters may be invalid
 *       500:
 *         description: Internal error
 *
 */

userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user:UserInput = req.body;
    const newUser = await userservice.createUser(user);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 fullname:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Invalid credentials provided
 *       500:
 *         description: Internal server error
 */




userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user:UserInput = req.body;
    const newUser = await userservice.authenticateUser(user);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});



export { userRouter };