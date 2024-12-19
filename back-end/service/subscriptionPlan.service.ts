 // Custom Subscription class
import { SubscriptionPlan } from '../model/subscriptionPlan';
import subscriptionPlanDb from '../repository/subscriptionPlan.db';

const getAllSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => subscriptionPlanDb.getAllSubscriptionPlans();

const getSubscriptionPlanId = async ({ id }: { id: number }) => {
  if (!id) {
      throw new Error('Subscription Plan ID is required');
  }

  const subscriptionPlan = await subscriptionPlanDb.getSubscriptionPlanbyId(id);

  if (!subscriptionPlan) {
      throw new Error(`Subscription Plan with ID ${id} not found`);
  }

  return subscriptionPlan;
};

export default {
    getAllSubscriptionPlans,
    getSubscriptionPlanId
};