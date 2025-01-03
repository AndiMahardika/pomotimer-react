import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingStore {
  workduration: number;
  shortbreakduration: number;
  longbreakduration: number;
  timerSound: string | null;
  isRunning: boolean;
  setWorkduration: (workduration: number) => void;
  setShortbreakduration: (shortbreakduration: number) => void;
  setLongbreakduration: (longbreakduration: number) => void;
  setTimerSound: (timerSound: string | null) => void;
  setIsRunning: (isRunning: boolean) => void;
  setAllSettings: (settings: {
    workduration: number;
    shortbreakduration: number;
    longbreakduration: number;
    timerSound: string | null;
  }) => void;
}

const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      workduration: 1500,
      shortbreakduration: 300,
      longbreakduration: 900,
      timerSound: null,
      isRunning: false,
      setWorkduration: (workduration) => set({ workduration }),
      setShortbreakduration: (shortbreakduration) => set({ shortbreakduration }),
      setLongbreakduration: (longbreakduration) => set({ longbreakduration }),
      setTimerSound: (timerSound) => set({ timerSound }),
      setIsRunning: (isRunning) => set({ isRunning }),
      setAllSettings: (settings) => set({ ...settings }),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSettingStore;
