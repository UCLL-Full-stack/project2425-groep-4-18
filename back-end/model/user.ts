import { Chat } from './chat';
import { Chat as ChatPrisma, User as UserPrisma, GroupChat as GroupChatPrisma } from '@prisma/client';
import { GroupChat } from './groupchat';

export class User {
    private id?: number;
    private role: string;
    private name: string;
    private firstName: string;
    private password: string;

    constructor(user: {
        id?: number;
        role?: string | null;
        name: string;
        firstName: string;
        password: string;
    }) {
        this.validate(user);
        this.id = user.id;
        this.role = user.role || 'student';
        this.name = user.name;
        this.firstName = user.firstName;
        this.password = user.password;
    }

    static from({
        id,
        role,
        name,
        firstName,
        password,
    }: UserPrisma ) {
        return new User({
            id,
            role,
            name,
            firstName,
            password,
        });
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getRole(): string{
        return this.role;
    }

    public getName(): string {
        return this.name;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getPassword(): string {
        return this.password; // Consider removing or securing this method
    }




    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.name === user.getName() &&
            this.firstName === user.getFirstName() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
            
        );
    }

    validate(user: {
        id?: number;
        role?: string | null;
        name: string;
        firstName: string;
        password: string;
    }): void {
        if (!user.name || user.name.trim() === '') {
            throw new Error('User name is required');
        }
        if (!user.firstName || user.firstName.trim() === '') {
            throw new Error('User first name is required');
        }
        if (!user.password || user.password.trim() === '') {
            throw new Error('User password is required');
        }
    }
}
