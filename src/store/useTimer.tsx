import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TimerStore {
  workduration: number;
  shortbreakduration: number;
  longbreakduration: number;
  timerSound: HTMLAudioElement | null;
}

const useTimerStore = create<TimerStore>()(
  persist(
    (set) => ({
      workduration: 1500,
      shortbreakduration: 300,
      longbreakduration: 900,
      timerSound: null,
    }),
    {
      name: "timer",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useTimerStore;