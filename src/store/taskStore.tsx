import { Tasks } from '@/utils/entity';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TaskStore {
  tasks: Tasks[];
  selectedTask: Tasks | null
  addTask: (task: Tasks) => void;
  updateTask: (taskId: string, updates: Partial<Tasks>) => void;
  deleteTask: (taskId: string) => void;
  setTasks: (tasks: Tasks[]) => void;
  selectTask: (taskId: string) => void;
  unselectTask: () => void;
  clearTasks: () => void;
}

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [] as Tasks[],
      selectedTask: null,
      addTask: (task: Tasks) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (taskId: string, updates: Partial<Tasks>) =>
        set((state) => {
          const tasks = state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        );
        const selectedTask = state.selectedTask?.id === taskId
          ? { ...state.selectedTask, ...updates }
          : state.selectedTask;
      
        return { tasks, selectedTask };
      }),
      deleteTask: (taskId: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      setTasks: (tasks: Tasks[]) => set({ tasks }),
      selectTask: (taskId: string) =>
        set((state) => {
          const selectedTask = state.tasks.find((task) => task.id === taskId);
          return { selectedTask };
        }),
      unselectTask: () => set({ selectedTask: null }),
      clearTasks: () => set({ tasks: [] }),
    }),
    {
      name: 'task',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;