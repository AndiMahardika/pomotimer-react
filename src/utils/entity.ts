export interface Tasks {
  id: number;
  created_at: string;
  task: string;
  is_selected: boolean;
  pomo_count: number;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
}