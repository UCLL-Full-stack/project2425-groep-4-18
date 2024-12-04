 // Custom Subscription class
import { SubscriptionPlan } from '../model/subscriptionPlan';
import subscriptionPlanDb from '../repository/subscriptionPlan.db';

const getAllSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => subscriptionPlanDb.getAllSubscriptionPlans();

export default {
    getAllSubscriptionPlans
};