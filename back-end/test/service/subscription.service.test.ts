import subscriptionService from '../../service/subscription.service';
import subscriptionDb from '../../repository/subscription.db';
import userDb from '../../repository/user.db';
import subscriptionPlanDb from '../../repository/subscriptionPlan.db';
import { Subscription } from '../../model/subscription';
import { User } from '../../model/user';
import { SubscriptionPlan } from '../../model/subscriptionPlan';
import { UserInput, SubscriptionPlanInput } from '../../types';

const userInput: UserInput = {
    id: 1,
    role: 'subscriber',
    name: 'John Doe',
    firstname: 'John',
    password: 'password123',
};
const user = new User({ ...userInput });

const subscriptionPlanInput: SubscriptionPlanInput = {
    id: 1,
    type: 'basic',
    description: 'basic subscription plan',
    price: 99.99,
    duration: 12,
};
const subscriptionPlan = new SubscriptionPlan({ ...subscriptionPlanInput });

let mockSubscriptionDbGetAllSubscriptions: jest.Mock;
let mockSubscriptionDbCreateSubscription: jest.Mock;
let mockSubscriptionDbGetSubscriptionPlanByUserName: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockUserDbGetUserByFirstname: jest.Mock;
let mockSubscriptionPlanDbGetSubscriptionPlanById: jest.Mock;

beforeEach(() => {
    // Mock database methods
    mockSubscriptionDbGetAllSubscriptions = jest.fn();
    mockSubscriptionDbCreateSubscription = jest.fn();
    mockUserDbGetUserById = jest.fn();
    mockUserDbGetUserByFirstname = jest.fn();
    mockSubscriptionPlanDbGetSubscriptionPlanById = jest.fn();
    mockSubscriptionDbGetSubscriptionPlanByUserName = jest.fn();

    // Replace actual functions with mocks
    subscriptionDb.getAllSubscriptions = mockSubscriptionDbGetAllSubscriptions;
    subscriptionDb.createSubscription = mockSubscriptionDbCreateSubscription;
    userDb.getUserById = mockUserDbGetUserById;
    userDb.getUserByFirstname = mockUserDbGetUserByFirstname;
    subscriptionPlanDb.getSubscriptionPlanbyId = mockSubscriptionPlanDbGetSubscriptionPlanById;
    subscriptionDb.getSubscriptionPlanByUserName = mockSubscriptionDbGetSubscriptionPlanByUserName;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a request for all subscriptions, when getAllSubscriptions is called, then it returns all subscriptions', async () => {
    const subscriptions = [
        new Subscription({
            id: 1,
            startDate: new Date(),
            endDate: new Date(),
            user,
            subscriptionPlan,
        }),
        new Subscription({
            id: 2,
            startDate: new Date(),
            endDate: new Date(),
            user,
            subscriptionPlan,
        }),
    ];
    mockSubscriptionDbGetAllSubscriptions.mockResolvedValue(subscriptions);

    const result = await subscriptionService.getAllSubscriptions();

    expect(mockSubscriptionDbGetAllSubscriptions).toHaveBeenCalledTimes(1);
    expect(result).toEqual(subscriptions);
});

test('given valid inputs, when createSubscriptions is called, then a subscription is created', async () => {
    const subscription = new Subscription({
        startDate: new Date(),
        endDate: new Date(),
        user,
        subscriptionPlan,
    });

    mockUserDbGetUserById.mockResolvedValue(user);
    mockSubscriptionPlanDbGetSubscriptionPlanById.mockResolvedValue(subscriptionPlan);
    mockSubscriptionDbGetSubscriptionPlanByUserName.mockResolvedValue(null);
    mockSubscriptionDbCreateSubscription.mockResolvedValue(subscription);

    const result = await subscriptionService.createSubscriptions({
        user: userInput,
        subscriptionPlan: subscriptionPlanInput,
    });

    expect(mockUserDbGetUserById).toHaveBeenCalledWith(1);
    expect(mockSubscriptionPlanDbGetSubscriptionPlanById).toHaveBeenCalledWith(1);
    expect(mockSubscriptionDbCreateSubscription).toHaveBeenCalledWith(expect.any(Subscription));
    expect(result).toEqual(subscription);
});

test('given a firstname, when getSubscriptionPlanByUserName is called, then it returns the subscription plan', async () => {
    const subscription = new Subscription({
        startDate: new Date(),
        endDate: new Date(),
        user,
        subscriptionPlan,
    });

    mockUserDbGetUserByFirstname.mockResolvedValue(user);
    mockSubscriptionDbGetSubscriptionPlanByUserName.mockResolvedValue(subscription);

    const result = await subscriptionService.getSubscriptionPlanByUserName('John');

    expect(mockUserDbGetUserByFirstname).toHaveBeenCalledWith('John');
    expect(mockSubscriptionDbGetSubscriptionPlanByUserName).toHaveBeenCalledWith('John');
    expect(result).toEqual(subscription);
});

test('given a non-existent user, when getSubscriptionPlanByUserName is called, then it throws an error', async () => {
    mockUserDbGetUserByFirstname.mockResolvedValue(null);

    await expect(subscriptionService.getSubscriptionPlanByUserName('Jane')).rejects.toThrow(
        'User with firstname Jane does not exist.'
    );

    expect(mockUserDbGetUserByFirstname).toHaveBeenCalledWith('Jane');
    expect(mockSubscriptionDbGetSubscriptionPlanByUserName).not.toHaveBeenCalled();
});
