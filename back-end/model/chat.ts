import { User } from "./user";

export class Chat {
    private id?: number;
    private message: string;
    private createdAt: Date;
    private user: User
    

    constructor(chat: {
        id?: number;
        message: string;
        createdAt: Date;
        user: User;
    }) {
        this.validate(chat);
        this.id = chat.id;
        this.message = chat.message;
        this.createdAt = chat.createdAt;
        this.user = chat.user;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getMessage(): string {
        return this.message;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUser(): User {
        return this.user;
    }

    validate(chat: { id?: number; message: string; createdAt: Date; user: User }): void {

        if (!chat.createdAt) {
            throw new Error('Chat creation date is required');
        }
        if (!chat.user) {
            throw new Error('Chat user is required');
        }
    }

    
}