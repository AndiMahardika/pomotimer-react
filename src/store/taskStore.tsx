import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";

const useTaskStore = create(
  persist(
    (set) => ({
      duration: 1000,
      setTaskStore: (duration: number) => set({duration}),
      restartDuration: () => set({duration: 1500})
    }),
    {
      name: "task",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useTaskStore;