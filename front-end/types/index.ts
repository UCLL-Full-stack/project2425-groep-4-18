
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

export type Subscription = {
  id?: number;
  startDate?: string;
  endDate?: string;
  user: User;
  subscriptionPlan: SubscriptionPlan;

}

export type SubscriptionPlan = {
  id: number;
  type: string;
  description: string;
  price: number;
  duration: number;
}

export type SessionUser = {
  token: string;
  fullname: string;
  firstname: string;
  role: Role;
}
