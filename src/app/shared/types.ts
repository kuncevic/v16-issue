export interface Users {
  id: number;
  userName: string;
  password: string;
  isLocked: boolean;
  lastLogin: Date;
  role: string;
}

export interface Customer {
  id: number;
  userId: number;
  title: string; //FK
  completed: boolean;
}

export interface Invoice {
  id: number;
  description: string;
  customerId: number; // FK Customer.Id
}
