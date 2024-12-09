import { error } from 'console';
import { Subscription } from '../model/subscription'; // Custom Subscription class
import subscriptionDb from '../repository/subscription.db';
import userDb from '../repository/user.db';
import { subscriptionInput, UserInput } from '../types';
import subscriptionPlanDb from '../repository/subscriptionPlan.db';

const calculateEndDate = (startDate: Date, durationInMonths: number): Date => {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + durationInMonths);
    return endDate;
};

const getAllSubscriptions = async (): Promise<Subscription[]> =>
    subscriptionDb.getAllSubscriptions();

const createSubscriptions = async ({
    startDate,
    user: UserInput,
    subscriptionPlan: SubscriptionPlanInput,
}: subscriptionInput): Promise<Subscription> => {
    if (!SubscriptionPlanInput.id) throw new Error('Subscription id is required');
    if (!UserInput.id) throw new Error('User id is required');
    const user = await userDb.getUserById(UserInput.id);
    const subscriptionPlan = await subscriptionPlanDb.getSubscriptionPlansbyId(
        SubscriptionPlanInput.id
    );

    if (!user) throw new Error('User not found');
    if (!subscriptionPlan) throw new Error('subscriptionPlan not found');

    const endDate = calculateEndDate(startDate, subscriptionPlan.getDuration())
    const subscription = new Subscription({ startDate, endDate, user, subscriptionPlan });
    return await subscriptionDb.createSubscription(subscription);
};

export default {
    getAllSubscriptions,
    createSubscriptions,
};
