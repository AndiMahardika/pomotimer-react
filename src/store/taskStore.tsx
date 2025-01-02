import { Tasks } from '@/utils/entity';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TaskStore {
  tasks: Tasks[];
  selectedTaskId: number | null;
  addTask: (task: Tasks) => void;
  updateTask: (taskId: number, updates: Partial<Tasks>) => void;
  deleteTask: (taskId: number) => void;
  setTasks: (tasks: Tasks[]) => void;
  selectTask: (taskId: number | null) => void;
}

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [] as Tasks[],
      selectedTaskId: null as number | null,
      addTask: (task: Tasks) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (taskId: number, updates: Partial<Tasks>) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        })),
      deleteTask: (taskId: number) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      setTasks: (tasks: Tasks[]) => set({ tasks }),
      selectTask: (taskId: number | null) => set({ selectedTaskId: taskId }),
    }),
    {
      name: 'task',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;