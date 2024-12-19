import { Chat, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Clear existing data
    await prisma.groupChat.deleteMany();
    await prisma.chat.deleteMany();
    await prisma.subscription.deleteMany();
    await prisma.subscriptionPlan.deleteMany();
    await prisma.user.deleteMany();

    // Create Subscription Plans
    const basicPlan = await prisma.subscriptionPlan.create({
        data: {
            type: 'Basic Plan',
            description: 'A basic subscription plan with limited features',
            price: 9.99,
            duration: 30, // Duration in days
        },
    });

    const premiumPlan = await prisma.subscriptionPlan.create({
        data: {
            type: 'Premium Plan',
            description: 'A premium subscription plan with full features',
            price: 19.99,
            duration: 30,
        },
    });

    // Create Users
    const users = [
        { name: 'hermans', firstname: 'frans', password: 'frans123', role: 'lecturer' },
        { name: 'janssesn', firstname: 'jan', password: 'jan123', role: 'student' },
        { name: 'istrator', firstname: 'admin', password: 'admin123', role: 'admin' },
        { name: 'hendrickxs', firstname: 'marie', password: 'marie123', role: 'student' },
        { name: 'geets', firstname: 'paul', password: 'paul123', role: 'lecturer' },

    ];

    const createdUsers = [];

    for (const user of users) {
        const createdUser = await prisma.user.create({
            data: {
                name: user.name,
                firstname: user.firstname,
                password: await bcrypt.hash(user.password, 12),
                role: user.role,
            },
        });

        createdUsers.push(createdUser);

        // Assign a subscription to the user based on their role
        if (user.role !== 'admin') {
            await prisma.subscription.create({
                data: {
                    startDate: new Date('2024-01-01'),
                    endDate: new Date('2024-02-01'),
                    userId: createdUser.id,
                    subscriptionPlanId: basicPlan.id,
                },
            });
        }
    }

    // Create GroupChats
    const groupChats = [
        {
            name: 'General Group Chat',
            description: 'A group chat for all users',
        },
        {
            name: 'Project Discussions',
            description: 'Discuss your projects here',
        },
        {
            name: 'Announcements',
            description: 'Official announcements and updates',
        },
    ];

    for (const group of groupChats) {
        const groupChat = await prisma.groupChat.create({
            data: {
                name: group.name,
                description: group.description,
                createdAt: new Date(),
            },
        });

        // Add a chat for every user in the group chat
        for (const user of createdUsers) {

            await prisma.chat.create({
                data: {
                    message: `${user.firstname} has been added to the group chat: ${groupChat.name}`,
                    createdAt: new Date(),
                    userId: user.id,
                    GroupChat: {
                        connect: { id: groupChat.id },
                    },
                },
            });
        }
    }

    console.log('Seeding completed!');
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
