import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TimerStore {
  currentDuration: number;
  setCurrentDuration: (duration: number) => void;
  workSession: boolean;
  setWorkSession: (session: boolean) => void;
  isRunning: boolean;
  setIsRunning: (run: boolean) => void;
}

const useTimerStore = create<TimerStore>()(
  persist(
    (set) => ({
      currentDuration: 1500, // Default 25 menit
      workSession: true, // Default work session
      isRunning: false,
      setCurrentDuration: (duration) => set({ currentDuration: duration }),
      setWorkSession: (session) => set({ workSession: session }),
      setIsRunning: (run) => set({ isRunning: run }),
    }),
    {
      name: "timer",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTimerStore;