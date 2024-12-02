import {
    Subscription as SubscriptionPrisma,
    User as UserPrisma,
    SubscriptionPlan as SubscriptionPlanPrisma,
} from '@prisma/client';
import { Type } from '../types';
import { User } from './user';
import { SubscriptionPlan } from './subscriptionPlan';

export class Subscription {
    private id?: number;
    private startDate: Date;
    private endDate: Date;
    private user: User;
    private subscriptionPlan: SubscriptionPlan;

    constructor(subscription: {
        id?: number;
        startDate: Date;
        endDate: Date;
        user: User;
        subscriptionPlan: SubscriptionPlan;
    }) {
        this.validate(subscription);
        this.id = subscription.id;
        this.startDate = subscription.startDate;
        this.endDate = subscription.endDate;
        this.user = subscription.user;
        this.subscriptionPlan = subscription.subscriptionPlan;
    }

    static from({
        id,
        startDate,
        endDate,
        user,
        subscriptionPlan,
    }: SubscriptionPrisma & { user: UserPrisma } & { subscriptionPlan: SubscriptionPlanPrisma }) {
        return new Subscription({
            id,
            startDate,
            endDate,
            user: User.from(user),
            subscriptionPlan: SubscriptionPlan.from(subscriptionPlan),
        });
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public getendDate(): Date {
        return this.endDate;
    }

    public getUser(): User {
        return this.user;
    }
    
    public getSubcriptionPlan(): SubscriptionPlan {
        return this.subscriptionPlan;
    }

    equals(subscription: Subscription): boolean {
        return (
            this.id === subscription.getId() &&
            this.startDate === subscription.getStartDate() &&
            this.endDate === subscription.getendDate() &&
            this.subscriptionPlan == subscription.getSubcriptionPlan()
        );
    }

    validate(subscription: { id?: number; startDate: Date; endDate: Date }): void {
        if (subscription.startDate > subscription.endDate) {
            throw new Error('subscription end date cannot be before startdate');
        }
    } 
}
