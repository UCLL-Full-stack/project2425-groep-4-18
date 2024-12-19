import { Subscription } from "../../model/subscription";
import { SubscriptionPlan } from "../../model/subscriptionPlan";
import { User } from "../../model/user";

const startDate = new Date('2024-01-01');
const endDate = new Date('2024-12-31');
const user = new User({id: 1, role: 'admin', name: 'name', firstname: 'firstName', password: 'password'});
const subscriptionPlan = new SubscriptionPlan({id: 1, type: "basic", description:"gfjdl", price: 4, duration: 1})

test('given: valid subscription values, when: subscription is created, then: subscription is created with those values', () => {
    // given & when
    const subscription = new Subscription({ id: 1, startDate, endDate, user, subscriptionPlan });

    // then
    expect(subscription.getId()).toBe(1);
    expect(subscription.getStartDate()).toEqual(startDate);
    expect(subscription.getendDate()).toEqual(endDate);
    expect(subscription.getUser()).toEqual(user);
    expect(subscription.getSubcriptionPlan()).toEqual(subscriptionPlan);
});

test('given: endDate before startDate, when: creating subscription, then: an error is thrown', () => {
    // given
    const invalidEndDate = new Date('2023-12-31');

    // when
    const createSubscription = () =>
        new Subscription({ id: 1, startDate, endDate: invalidEndDate, user, subscriptionPlan });

    // then
    expect(createSubscription).toThrow('subscription end date cannot be before startdate');
});

test('given: two identical subscriptions, when: checking equality, then: they are equal', () => {
    // given
    const subscription1 = new Subscription({ id: 1, startDate, endDate, user, subscriptionPlan });
    const subscription2 = new Subscription({ id: 1, startDate, endDate, user, subscriptionPlan });

    // when
    const isEqual = subscription1.equals(subscription2);

    // then
    expect(isEqual).toBe(true);
});

test('given: two different subscriptions, when: checking equality, then: they are not equal', () => {
    // given
    const subscription1 = new Subscription({ id: 1, startDate, endDate, user, subscriptionPlan });
    const subscription2 = new Subscription({
        id: 2,
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-12-31'),
        user,
        subscriptionPlan,
    });

    // when
    const isEqual = subscription1.equals(subscription2);

    // then
    expect(isEqual).toBe(false);
});
