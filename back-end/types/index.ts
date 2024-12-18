type Type = 'basic' | 'advanced' | 'max';
type Role = 'lecturer' | 'student'| 'admin';

type UserInput = {
  id?: number;
  password: string;
  firstname: string;
  name: string;
  role?: string;
  chats?: ChatInput[];
};

type ChatInput = {
  createdAt: Date;
  id?: number;
  message: string;
  user: string;
}
type GroupChatInput = {
  createdAt: Date;
  id?: number;
  name: string;
  description: string;
  
}

type subscriptionInput = { 
  id?: number;
  startDate?: Date;
  endDate?: Date;
  user: UserInput;
  subscriptionPlan: SubscriptionPlanInput
}

type SubscriptionPlanInput = { 
  id?: number;
  type: Type;
  description: string;
  price: number;
  duration: number
}

type AuthenticationResponse = {
  id?: number;
  token: string;
  firstname: string;
  fullname: string;
  role: Role;
};

export {
  Type,
  UserInput,
  ChatInput,
  GroupChatInput,
  subscriptionInput,
  SubscriptionPlanInput,
  AuthenticationResponse,
  Role
}



