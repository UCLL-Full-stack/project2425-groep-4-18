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
    user: UserInput,
    subscriptionPlan: SubscriptionPlanInput,
}: subscriptionInput): Promise<Subscription> => {
    if (!SubscriptionPlanInput.id) throw new Error('Subscription id is required');
    if (!UserInput.id) throw new Error('User id is required');
    const user = await userDb.getUserById(UserInput.id);
    const subscriptionPlan = await subscriptionPlanDb.getSubscriptionPlanbyId(
        SubscriptionPlanInput.id
    );

    if (!user) throw new Error('User not found');
    if (!subscriptionPlan) throw new Error('subscriptionPlan not found');


    const startDate = new Date()
    const endDate = calculateEndDate(startDate, subscriptionPlan.getDuration())
    const subscription = new Subscription({ startDate, endDate, user, subscriptionPlan });
    return await subscriptionDb.createSubscription(subscription);
};

const getSubscriptionPlanByUserName = async (firstname: string) => {
    const user = await userDb.getUserByFirstname(firstname);
    if (!user) {
        throw new Error(`User with firstname ${firstname} does not exist.`);
    }
    console.log(user);
    return subscriptionDb.getSubscriptionPlanByUserName(firstname);
} 

export default {
    getAllSubscriptions,
    createSubscriptions,
    getSubscriptionPlanByUserName
};
