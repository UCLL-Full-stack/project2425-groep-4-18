/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Subscription:
 *          type: object
 *          properties:
 *               startDate:
 *                 type: Date
 *                 example: "2024-12-10T00:00:00.000Z"
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *               subscriptionPlan:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *
 */

import express, { Request, Response, NextFunction } from 'express';
import subscriptionService from '../service/subscription.service';
import { subscriptionInput } from '../types';
const subscriptionRouter = express.Router();

/**
 * @swagger
 * /subscription:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all chat
 *     tags: [Subscription]
 *     responses:
 *       200:
 *         description: The list of subscription.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 */

subscriptionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptions = await subscriptionService.getAllSubscriptions();
        res.json(subscriptions);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /subscription:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new group chat
 *     tags:
 *       - Subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: The group chat was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       500:
 *         description: Some server error
 */

subscriptionRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptionInput: subscriptionInput = req.body;
        console.log(req.body);
        const subscription = await subscriptionService.createSubscriptions(subscriptionInput);
        res.json(subscription);
    } catch (error) {
        next(error);
    }
});

export { subscriptionRouter };
