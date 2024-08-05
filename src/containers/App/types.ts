export interface User {
  id?: number;
  email?: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppState {
  googleToken: string;
  user: User | null;
}
