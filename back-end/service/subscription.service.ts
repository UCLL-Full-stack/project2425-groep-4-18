import { Subscription } from "../model/subscription"; // Custom Subscription class
import subscriptionDb from '../repository/subscription.db';
const getAllSubscriptions = async (): Promise<Subscription[]> => subscriptionDb.getAllSubscriptions();

export default {
    getAllSubscriptions
};