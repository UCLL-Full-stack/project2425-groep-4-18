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

export default { getAllSubscriptionPlans };