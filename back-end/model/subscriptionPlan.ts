import { SubscriptionPlan as SubscriptionPlanPrisma } from '@prisma/client';
import { Type } from '../types';

export class SubscriptionPlan {
    private id?: number;
    private type: Type;
    private description: string;
    private price: number;
    private duration: number;

    // Constructor to instantiate the class
    constructor({
        id,
        type,
        description,
        price,
        duration,
    }: {
        id: number;
        type: Type;
        description: string;
        price: number;
        duration: number;
    }) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.price = price;
        this.duration = duration;
    }

    static from({
        id,
        type,
        description,
        price,
        duration,
    }: SubscriptionPlanPrisma): SubscriptionPlan {
        return new SubscriptionPlan({
            id,
            type: type as Type,
            description,
            price,
            duration,
        });
    }

    public getId(): number | undefined {
        return this.id;
    }
    public getType(): Type {
        return this.type;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPrice(): number {
        return this.price;
    }

    public getDuration(): number {
        return this.duration;
    }

    equals(subscriptionPlan: SubscriptionPlan): boolean {
        return (
            this.id === subscriptionPlan.getId() &&
            this.type === subscriptionPlan.getType() &&
            this.description === subscriptionPlan.getDescription() &&
            this.price == subscriptionPlan.getPrice() &&
            this.duration == subscriptionPlan.getDuration()
        );
    }

    validate(subscriptionPlan: {
        id?: number;
        type: Type;
        description: String;
        price: number;
        duration: Number;
    }): void {
        if (!subscriptionPlan.type) {
            throw new Error('subscriptionPlan type is required');
        }
    }
}
