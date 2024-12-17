// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.subscription.deleteMany();
    await prisma.subscriptionPlan.deleteMany();
    await prisma.chat.deleteMany();
    await prisma.user.deleteMany();
    // Create a Subscription Plan
    const basicPlan = await prisma.subscriptionPlan.create({
        data: {
            type: 'Basic Plan',
            description: 'A basic subscription plan with limited features', // Add description here
            price: 9.99,
            duration: 1,
        },
    });

    const UserJ = await prisma.user.create({
        data: {
            id: 1,
            role: 'student', // or 'admin' if needed
            name: 'Doe',
            firstname: 'John',
            password: await bcrypt.hash('password', 12),
            chats: {
                create: [
                    {
                        message: 'lorem ipsum',
                        createdAt: new Date('2003-12-18'),
                    },
                ],
            },
        },
    });

    const subscription = await prisma.subscription.create({
        data: {
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-02-01'),
            userId: UserJ.id, // Foreign key reference to User
            subscriptionPlanId: basicPlan.id, // Foreign key reference to SubscriptionPlan
        },
    });
};


(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
