import database from "./database";
import { SubscriptionPlan } from "../model/subscriptionPlan";

const getAllSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
    try {
        const SubscriptionPlanPrisma = await database.subscriptionPlan.findMany();
        return SubscriptionPlanPrisma.map((SubscriptionPlanPrisma) => SubscriptionPlan.from(SubscriptionPlanPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getSubscriptionPlanbyId = async (id: number) => {
    try {
        const SubscriptionPlanPrisma = await database.subscriptionPlan.findUnique({
            where: { id },
        });
        return SubscriptionPlanPrisma ? SubscriptionPlan.from(SubscriptionPlanPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default { getAllSubscriptionPlans, getSubscriptionPlanbyId };
