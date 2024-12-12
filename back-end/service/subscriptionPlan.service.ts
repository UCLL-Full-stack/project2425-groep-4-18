 // Custom Subscription class
import { SubscriptionPlan } from '../model/subscriptionPlan';
import subscriptionPlanDb from '../repository/subscriptionPlan.db';

const getAllSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => subscriptionPlanDb.getAllSubscriptionPlans();

const getSubscriptionPlanId = async ({id}: {id:number}) => {
    if (!id) {
      throw new Error('User ID is required');
    }
    return subscriptionPlanDb.getSubscriptionPlanbyId(id);
  }

export default {
    getAllSubscriptionPlans,
    getSubscriptionPlanId
};