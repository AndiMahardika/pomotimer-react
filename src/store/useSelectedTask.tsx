import { SelectedTask } from "@/utils/entity";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SelectedTaskStore {
  selectedTask: SelectedTask | null;
  setSelectedTask: (selectedTask: SelectedTask | null) => void;
  setUpdatedTask: (updatedTask: Partial<SelectedTask>) => void; // Partial untuk update sebagian
  currentDuration: number;
  setCurrentDuration: (duration: number) => void;
  workSession: boolean;
  setWorkSession: (session: boolean) => void;
  isRunning: boolean;
  setIsRunning: (run: boolean) => void;
}

const useSelectedTaskStore = create<SelectedTaskStore>()(
  persist(
    (set) => ({
      selectedTask: null,
      currentDuration: 5, // Default 25 menit
      workSession: true, // Default work session
      isRunning: false,
      setSelectedTask: (selectedTask) => set({ selectedTask }),
      setUpdatedTask: (updatedTask) =>
        set((state) => ({
          selectedTask: state.selectedTask
            ? { ...state.selectedTask, ...updatedTask }
            : null,
        })),
      setCurrentDuration: (duration) => set({ currentDuration: duration }),
      setWorkSession: (session) => set({ workSession: session }),
      setIsRunning: (run) => set({ isRunning: run }),
    }),
    {
      name: "selectedTask",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSelectedTaskStore;