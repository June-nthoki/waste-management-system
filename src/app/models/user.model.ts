export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'waste_team';
  createdAt: Date;
  avatar?: string;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'waste_team';
}

export interface AuthResponse {
  user: User;
  token: string;
}