export interface Tasks {
  id: number;
  created_at: string;
  task: string;
  is_selected: boolean;
  pomo_count: number;
}

export interface SelectedTask {
  id: number;
  created_at: string;
  task: string;
  is_selected: boolean;
  pomo_count: number;
  timeRemaining: number;
  workSession: boolean;
  workduration: number;
}