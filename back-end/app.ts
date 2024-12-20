import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { chatRouter } from './controller/chat.routes';
import { groupchatRouter } from './controller/groupchat.routes';
import { expressjwt } from 'express-jwt';
import { subscriptionRouter } from './controller/subscription.routes';
import { subscriptionPlanRouter } from './controller/subscriptionPlan.routes';
const app = express();

app.use(helmet());
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs','/users/login','/status',/^\/api-docs\/.*/,'/users/register'],
    })
);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/users', userRouter);
app.use('/chats', chatRouter);
app.use('/groupchats', groupchatRouter);
app.use('/subscription', subscriptionRouter);
app.use('/subscriptionPlan', subscriptionPlanRouter);
// error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});


const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Team 4-18 API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



