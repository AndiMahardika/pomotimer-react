import useSettingStore from "@/store/useSettingStore";
import { db } from "@/utils/firebase";
import { collection, query, where, onSnapshot, limit } from "firebase/firestore";
import { useEffect } from "react";
import useUserStore from "@/store/useUserStore";

export default function useSetting() {
  const { workduration, shortbreakduration, longbreakduration, timerSound, setAllSettings} = useSettingStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "settings"), 
      where("user_id", "==", user.uid),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setAllSettings({
          workduration: data.work_duration || 1500,
          shortbreakduration: data.short_break_duration || 300,
          longbreakduration: data.long_break_duration || 900,
          timerSound: data.timer_sound || null,
        });
      }
    }, (error) => {
      console.error("Error fetching settings:", error);
    });
  
    return () => unsubscribe();
  }, [user?.uid, setAllSettings]);  

  return {
    workduration,
    shortbreakduration,
    longbreakduration,
    timerSound,
  };
}