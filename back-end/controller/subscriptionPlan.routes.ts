/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      SubscriptionPlan:
 *          type: object
 *          properties:
 *            startDate:
 *              type: Date
 *            endDate:
 *              type: Date
 * 
 */

import express, { Request, Response, NextFunction } from 'express';
import subscriptionPlanService from '../service/subscriptionPlan.service';
const subscriptionPlanRouter = express.Router();

/**
 * @swagger
 * /subscriptionPlan:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all subscriptionPlans
 *     tags: [SubscriptionPlan]
 *     responses:
 *       200:
 *         description: The list of subscription.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubscriptionPlan'
 */

subscriptionPlanRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptionPlans = await subscriptionPlanService.getAllSubscriptionPlans();
        res.json(subscriptionPlans);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /subscriptionPlan/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get SubscriptionPlan by id
 *     tags:
 *       - SubscriptionPlan
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: SubscriptionPlan id
 *     responses:
 *       200:
 *         description: The SubscriptionPlan description by id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionPlan'
 *
 */

subscriptionPlanRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const user = await subscriptionPlanService.getSubscriptionPlanId({id: id});
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

export { subscriptionPlanRouter };

