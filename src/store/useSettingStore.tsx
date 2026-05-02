import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingStore {
  workduration: number;
  shortbreakduration: number;
  longbreakduration: number;
  timerSound: string | null;
  isRunning: boolean;
  setWorkduration: (_workduration: number) => void;
  setShortbreakduration: (_shortbreakduration: number) => void;
  setLongbreakduration: (_longbreakduration: number) => void;
  setTimerSound: (_timerSound: string | null) => void;
  setIsRunning: (_isRunning: boolean) => void;
  setAllSettings: (_settings: {
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
