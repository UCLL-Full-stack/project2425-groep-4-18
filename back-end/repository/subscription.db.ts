import database from './database';
import { Subscription } from '../model/subscription';

const getAllSubscriptions = async (): Promise<Subscription[]> => {
    try {
        const subscriptionPrisma = await database.subscription.findMany({
            include: { user: true, subscriptionPlan: true }, // Include relationships
        });
        return subscriptionPrisma.map((subscriptionPrisma) =>
            Subscription.from(subscriptionPrisma)
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createSubscription = async (subscription: Subscription): Promise<Subscription> => {
    try {
        const subscriptionPrisma = await database.subscription.create({
            data: {
                startDate: subscription.getStartDate(),
                endDate: subscription.getendDate(),
                user: { connect: { id: subscription.getUser().getId() } },
                subscriptionPlan: { connect: { id: subscription.getSubcriptionPlan().getId() } },
            },
            include: {
                user: true,
                subscriptionPlan: true,
            },
        });
        return Subscription.from(subscriptionPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllSubscriptions, createSubscription };
