// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.chat.deleteMany();
    await prisma.user.deleteMany();

    const UserJ = await prisma.user.create({
        data: {
            id: 1,
            role: 'user', // or 'admin' if needed
            name: 'Doe',
            firstName: 'John',
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
