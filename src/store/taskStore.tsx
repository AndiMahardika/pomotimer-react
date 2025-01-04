import { Tasks } from '@/utils/entity';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TaskStore {
  tasks: Tasks[];
  selectedTask: Tasks | null
  addTask: (task: Tasks) => void;
  updateTask: (taskId: number, updates: Partial<Tasks>) => void;
  deleteTask: (taskId: number) => void;
  setTasks: (tasks: Tasks[]) => void;
  selectTask: (taskId: number) => void;
  unselectTask: () => void;
}

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [] as Tasks[],
      selectedTask: null,
      addTask: (task: Tasks) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (taskId: number, updates: Partial<Tasks>) =>
        set((state) => {
          const tasks = state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        );
        const selectedTask = state.selectedTask?.id === taskId
          ? { ...state.selectedTask, ...updates }
          : state.selectedTask;
      
        return { tasks, selectedTask };
      }),
      deleteTask: (taskId: number) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      setTasks: (tasks: Tasks[]) => set({ tasks }),
      selectTask: (taskId: number) =>
        set((state) => {
          const selectedTask = state.tasks.find((task) => task.id === taskId);
          return { selectedTask };
        }),
      unselectTask: () => set({ selectedTask: null }),
    }),
    {
      name: 'task',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;