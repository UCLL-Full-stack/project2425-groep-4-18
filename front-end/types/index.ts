
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

export type Chat = {
  id: number;
  message: string;
  user: User;
  createdAt: Date;
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
