import useSettingStore from "@/store/useSettingStore";
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";

export default function useSetting() {
  const { workduration, shortbreakduration, longbreakduration, timerSound, setAllSettings} = useSettingStore();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("*")
          .single();
  
        if (error) throw error;
  
        setAllSettings({
          workduration: data.work_duration || 1500,
          shortbreakduration: data.short_break_duration || 300,
          longbreakduration: data.long_break_duration || 900,
          timerSound: data.timer_sound || null,
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
  
    fetchSettings();
  }, []);  

  return {
    workduration,
    shortbreakduration,
    longbreakduration,
    timerSound,
  };
}