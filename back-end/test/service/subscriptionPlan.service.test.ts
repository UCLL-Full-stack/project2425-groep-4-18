import subscriptionPlanService from '../../service/subscriptionPlan.service';
import subscriptionPlanDb from '../../repository/subscriptionPlan.db';
import { SubscriptionPlan } from '../../model/subscriptionPlan';
import { Type } from '../../types';

const subscriptionPlanData = {
    id: 1,
    type: 'basic' as Type,
    description: 'Basic subscription plan',
    price: 99.99,
    duration: 12,
};
const subscriptionPlan = new SubscriptionPlan(subscriptionPlanData);

let mockSubscriptionPlanDbGetAllSubscriptionPlans: jest.Mock;
let mockSubscriptionPlanDbGetSubscriptionPlanById: jest.Mock;

beforeEach(() => {
    // Mock database methods
    mockSubscriptionPlanDbGetAllSubscriptionPlans = jest.fn();
    mockSubscriptionPlanDbGetSubscriptionPlanById = jest.fn();

    // Replace actual functions with mocks
    subscriptionPlanDb.getAllSubscriptionPlans = mockSubscriptionPlanDbGetAllSubscriptionPlans;
    subscriptionPlanDb.getSubscriptionPlanbyId = mockSubscriptionPlanDbGetSubscriptionPlanById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a request for all subscription plans, when getAllSubscriptionPlans is called, then it returns all subscription plans', async () => {
    const subscriptionPlans = [subscriptionPlan];

    mockSubscriptionPlanDbGetAllSubscriptionPlans.mockResolvedValue(subscriptionPlans);

    const result = await subscriptionPlanService.getAllSubscriptionPlans();

    expect(mockSubscriptionPlanDbGetAllSubscriptionPlans).toHaveBeenCalledTimes(1);
    expect(result).toEqual(subscriptionPlans);
});

test('given a valid subscription plan ID, when getSubscriptionPlanId is called, then it returns the subscription plan', async () => {
    mockSubscriptionPlanDbGetSubscriptionPlanById.mockResolvedValue(subscriptionPlan);

    const result = await subscriptionPlanService.getSubscriptionPlanId({ id: 1 });

    expect(mockSubscriptionPlanDbGetSubscriptionPlanById).toHaveBeenCalledWith(1);
    expect(result).toEqual(subscriptionPlan);
});

test('given a missing subscription plan ID, when getSubscriptionPlanId is called, then it throws an error', async () => {
    await expect(subscriptionPlanService.getSubscriptionPlanId({ id: undefined as any })).rejects.toThrow(
        'User ID is required'
    );

    expect(mockSubscriptionPlanDbGetSubscriptionPlanById).not.toHaveBeenCalled();
});

test('given a non-existent subscription plan ID, when getSubscriptionPlanId is called, then it throws an error', async () => {
    mockSubscriptionPlanDbGetSubscriptionPlanById.mockResolvedValue(null);

    await expect(subscriptionPlanService.getSubscriptionPlanId({ id: 999 })).rejects.toThrow(
        'Subscription Plan with ID 999 not found'
    );

    expect(mockSubscriptionPlanDbGetSubscriptionPlanById).toHaveBeenCalledWith(999);
});
