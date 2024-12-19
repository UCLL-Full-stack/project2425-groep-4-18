import { SubscriptionPlan } from "../../model/subscriptionPlan";
import { Type } from "../../types";

const validSubscriptionPlanData = {
    id: 1,
    type: "basic" as Type,
    description: "Basic subscription plan",
    price: 99.99,
    duration: 12,
};

test("given: valid subscription plan values, when: subscription plan is created, then: subscription plan is created with those values", () => {
    // given & when
    const subscriptionPlan = new SubscriptionPlan(validSubscriptionPlanData);

    // then
    expect(subscriptionPlan.getId()).toBe(1);
    expect(subscriptionPlan.getType()).toBe("basic");
    expect(subscriptionPlan.getDescription()).toBe("Basic subscription plan");
    expect(subscriptionPlan.getPrice()).toBe(99.99);
    expect(subscriptionPlan.getDuration()).toBe(12);
});

test("given: two identical subscription plans, when: checking equality, then: they are equal", () => {
    // given
    const subscriptionPlan1 = new SubscriptionPlan(validSubscriptionPlanData);
    const subscriptionPlan2 = new SubscriptionPlan(validSubscriptionPlanData);

    // when
    const isEqual = subscriptionPlan1.equals(subscriptionPlan2);

    // then
    expect(isEqual).toBe(true);
});

test("given: two different subscription plans, when: checking equality, then: they are not equal", () => {
    // given
    const subscriptionPlan1 = new SubscriptionPlan(validSubscriptionPlanData);
    const subscriptionPlan2 = new SubscriptionPlan({
        ...validSubscriptionPlanData,
        price: 199.99,
    });

    // when
    const isEqual = subscriptionPlan1.equals(subscriptionPlan2);

    // then
    expect(isEqual).toBe(false);
});

test("given: a subscription plan with a missing type, when: validating, then: an error is thrown", () => {
    // given
    const invalidSubscriptionPlanData = { ...validSubscriptionPlanData, type: undefined } as any;

    const subscriptionPlan = new SubscriptionPlan(validSubscriptionPlanData);

    // when & then
    expect(() => subscriptionPlan.validate(invalidSubscriptionPlanData)).toThrow(
        "subscriptionPlan type is required"
    );
});
