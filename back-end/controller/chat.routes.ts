/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Chat:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            createdAt:
 *              type: Date
 *            userId:
 *              type: number
 *              format: int64
 *        
 * 
 */



import express, { Request, Response,NextFunction } from 'express';
import chatservice from '../service/chat.service';
import { ChatInput } from '../types';
const chatRouter = express.Router();

/**
 * @swagger
 * /chats:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all chats
 *     tags:
 *       - Chats
 *     responses:
 *       200:
 *         description: The list of chats.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 */



chatRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {;
try {
    const users = await chatservice.getAllChat();
    res.json(users);
  } catch (error) {
    next(error);
    
  }
});



/**
 * @swagger
 * /chats/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a chat by ID
 *     description: Returns a chat object by the provided chat ID.
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the chat to retrieve.
 *     responses:
 *       200:
 *         description: A chat object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       404:
 *         description: Chat not found.
 */
chatRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const id = parseInt(req.params.id, 10); // Extract and parse the ID from the path
      const chat = await chatservice.getChatById({ id }); // Call the service to get chat by ID
      res.status(200).json(chat); // Return the chat data if found
  } catch (error) {
      next(error) // Handle errors (e.g., chat not found)
  }
});



/**
 * @swagger
 * /chats/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get chats by User ID
 *     description: Returns chat objects by the provided user ID.
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: User ID to retrieve chats for.
 *     responses:
 *       200:
 *         description: Chat objects associated with the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       404:
 *         description: Chats not found for the user.
 */
chatRouter.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const userId = parseInt(req.params.id, 10); 
      const chat = await chatservice.getChatByUserId({ userId }); 
      res.status(200).json(chat); 
  } catch (error) {
      next(error) 
  }
});


/**
 * @swagger
 * /chats:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new chat
 *     tags:
 *       - Chats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *     responses:
 *       200:
 *         description: The chat was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Bad request. Chat was not created.
 */
chatRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const chat:ChatInput = req.body;
      console.log(req.body);
      const newChat = await chatservice.createChat(chat);
      
      res.status(200).json(newChat); 
  } catch (error) {
      next(error) 
  }
});

export { chatRouter };