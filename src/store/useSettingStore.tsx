import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingStore {
  workduration: number;
  shortbreakduration: number;
  longbreakduration: number;
  timerSound: string | null;
  setWorkduration: (workduration: number) => void;
  setShortbreakduration: (shortbreakduration: number) => void;
  setLongbreakduration: (longbreakduration: number) => void;
  setTimerSound: (timerSound: string | null) => void;
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
      workduration: 25,
      shortbreakduration: 5,
      longbreakduration: 15,
      timerSound: null,
      setWorkduration: (workduration) => set({ workduration }),
      setShortbreakduration: (shortbreakduration) => set({ shortbreakduration }),
      setLongbreakduration: (longbreakduration) => set({ longbreakduration }),
      setTimerSound: (timerSound) => set({ timerSound }),
      setAllSettings: (settings) => set({ ...settings }),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSettingStore;
