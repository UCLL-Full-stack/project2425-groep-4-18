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
 *            startDate:
 *              type: Date
 *            endDate:
 *              type: Date
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

export { subscriptionRouter };
