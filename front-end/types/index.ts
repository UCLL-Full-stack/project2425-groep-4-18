
export type User = {
  id?: number;
  name: string;
  firstname: string;
  password: string;
  role?: Role;
}
export type Role = 'lecturer' | 'student'| 'admin';

export type StatusMessage = {
  message: string;
  type: "error" | "success";
}
export type ChatInput = {
  message: string;
  user: string;
  createdAt: Date;
}

export type Chat = {
  id: number;
  message: string;
  user: User;
  createdAt: Date;
}

export type GroupChatInput = {
  name: string;
  createdAt?: Date;
  description: string;
}

export type GroupChat = {
  id: number;
  name: string;
  chats: Chat[];
  createdAt: Date;
}

export type SubscriptionPlan = {
  id: number;
  type: string;
  description: string;
  price: number;
  duration: number;

}
