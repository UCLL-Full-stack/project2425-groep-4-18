
import { 
  Chat as ChatPrisma,
  GroupChat as GroupChatPrisma,
  User as UserPrisma

 } from '@prisma/client';
import { User } from './user';
import { Chat } from './chat';

export class GroupChat{
  private id?: number;
  private name: string;
  private description: string;
  private createdAt: Date;
  private chats: Chat[];

  constructor(groupchat: {
    id?: number;
    name: string;
    description: string;
    createdAt: Date;
    chats?: Chat[];
  }){
    this.validate(groupchat);
    this.id = groupchat.id;
    this.name = groupchat.name;
    this.description = groupchat.description;
    this.createdAt = groupchat.createdAt;
    this.chats = groupchat.chats ?? [];
  }

  public getId(): number | undefined {
    return this.id;
  }

  public getDescription(): string {
      return this.description;
  }

  public getCreatedAt(): Date {
      return this.createdAt;
  }

  public getName(): string {
    return this.name;
  }

  public getChats(): Chat[] {
    return this.chats;
  }

  public addChat(chat: Chat): void {
    this.chats.push(chat);
  }

  validate(groupchat: { id?: number; name: string; description: string; createdAt: Date }): void {
    if (!groupchat.createdAt) {
        throw new Error('GroupChat creation date is required');
    }
  }

  static from({
    id,
    name,
    description,
    createdAt,
    chats,
}: GroupChatPrisma & { chats: (ChatPrisma & { user: UserPrisma })[] }) {
    return new GroupChat({
        id,
        name,
        description,
        createdAt,
        chats: chats.map((chat) => Chat.from(chat)),
    });
}

}