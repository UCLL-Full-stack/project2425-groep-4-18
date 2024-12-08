/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      GroupChat:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            description: 
 *              type: string
 *            createdAt:
 *              type: Date
 *              
 * 
 */

import express, { Request, Response,NextFunction } from 'express';
import groupchatservice from '../service/groupchat.service';
import { GroupChatInput } from '../types';
const groupchatRouter = express.Router();

/**
 * @swagger
 * /groupchats:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all group chats
 *     tags:
 *       - GroupChats
 *     responses:
 *       200:
 *         description: The list of chats.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupChat'
 *
 */

groupchatRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
try {
    const groupchats = await groupchatservice.getAllGroupChats();
    res.json(groupchats);
  } catch (error) {
    next(error);
  }
}
);


/**
 * @swagger
 * /groupchats/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get group chat by id
 *     tags:
 *       - GroupChats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: Group chat id
 *     responses:
 *       200:
 *         description: The group chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupChat'
 *       404:
 *         description: Group chat not found
 *
 */

groupchatRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupchat = await groupchatservice.getGroupChatById({ id: parseInt(req.params.id) });
    res.json(groupchat);
  } catch (error) {
    next(error);
  }
}
);


/**
 * @swagger
 * /groupchats:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new group chat
 *     tags:
 *       - GroupChats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupChat'
 *     responses:
 *       200:
 *         description: The group chat was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupChat'
 *       500:
 *         description: Some server error
 */

groupchatRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupChatInput: GroupChatInput = req.body;
    console.log(req.body);
    const groupChat = await groupchatservice.createGroupChat(groupChatInput);
    res.json(groupChat);
  } catch (error) {
    next(error);
  }
}
);

/**
 * @swagger
 * /groupchats/{id}/chat:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add chat to group chat
 *     tags:
 *       - GroupChats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: Group chat id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: integer
 *             required:
 *               - chatId
 *     responses:
 *       200:
 *         description: The chat was successfully added to the group chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupChat'
 *       404:
 *         description: Group chat or chat not found
 *       500:
 *         description: Some server error
 */




groupchatRouter.post('/:id/chat', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupChatId = parseInt(req.params.id);
    const chatId = parseInt(req.body.chatId);
    const groupChat = await groupchatservice.addchattoGroupChat(groupChatId, chatId);
    res.json(groupChat);
  } catch (error) {
    next(error);
  }

}
);

/**
 * @swagger
 * /groupchats/user:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Get group chats by user firstname
 *     tags:
 *       - GroupChats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The firstname of the user whose group chats you want to fetch
 *             required:
 *               - firstname
 *     responses:
 *       200:
 *         description: List of group chats for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupChat'
 */



groupchatRouter.post('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstname } = req.body;
    console.log(firstname);
    const groupchats = await groupchatservice.getGroupchatbyFirstname(firstname);
    res.json(groupchats);
  } catch (error) {
    next(error);
  }
}
);

export { groupchatRouter };