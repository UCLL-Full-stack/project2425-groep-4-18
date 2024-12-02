import database from "./database";
import { Subscription } from "../model/subscription";

const getAllSubscriptions = async (): Promise<Subscription[]> => {
    try {
        const subscriptionPrisma = await database.subscription.findMany({
            include: { user: true, subscriptionPlan: true }, // Include relationships
        });
        return subscriptionPrisma.map((subscriptionPrisma) => Subscription.from(subscriptionPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllSubscriptions };
