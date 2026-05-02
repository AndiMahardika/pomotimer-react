export interface Tasks {
  id?: string;
  created_at?: string;
  user_id?: string;
  task: string;
  is_selected: boolean;
  pomo_count: number;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  created_at?: string;
}