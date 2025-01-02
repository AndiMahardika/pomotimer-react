import useSettingStore from "@/store/useSettingStore";
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";

export default function useSetting() {
  const {
    workduration,
    shortbreakduration,
    longbreakduration,
    timerSound,
    setAllSettings,
  } = useSettingStore();

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();

      if (error) throw error;

      if (data) {
        setAllSettings({
          workduration: data.work_duration,
          shortbreakduration: data.short_break_duration,
          longbreakduration: data.long_break_duration,
          timerSound: data.timer_sound,
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    workduration,
    shortbreakduration,
    longbreakduration,
    timerSound,
    fetchSettings,
  };
}