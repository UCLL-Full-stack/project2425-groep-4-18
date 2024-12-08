import { Chat } from './chat';
import { Chat as ChatPrisma, User as UserPrisma, GroupChat as GroupChatPrisma } from '@prisma/client';
import { GroupChat } from './groupchat';

export class User {
    private id?: number;
    private role: string;
    private name: string;
    private firstname: string;
    private password: string;

    constructor(user: {
        id?: number;
        role?: string | null;
        name: string;
        firstname: string;
        password: string;
    }) {
        this.validate(user);
        this.id = user.id;
        this.role = user.role || 'student';
        this.name = user.name;
        this.firstname = user.firstname;
        this.password = user.password;
    }

    static from({
        id,
        role,
        name,
        firstname,
        password,
    }: UserPrisma ) {
        return new User({
            id,
            role,
            name,
            firstname,
            password,
        });
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getRole(): string{
        return this.role;
    }

    public getname(): string {
        return this.name;
    }

    public getFirstname(): string {
        return this.firstname;
    }

    public getPassword(): string {
        return this.password; // Consider removing or securing this method
    }




    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.name === user.getname() &&
            this.firstname === user.getFirstname() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
            
        );
    }

    validate(user: {
        id?: number;
        role?: string | null;
        name: string;
        firstname: string;
        password: string;
    }): void {
        if (!user.name || user.name.trim() === '') {
            throw new Error('User name is required');
        }
        if (!user.firstname || user.firstname.trim() === '') {
            throw new Error('User first name is required');
        }
        if (!user.password || user.password.trim() === '') {
            throw new Error('User password is required');
        }
    }
}
