import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function useSetting() {
  const [workduration, setWorkduration] = useState(1500);

  const fetchingSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();
      
      console.log(data)
      setWorkduration(data.work_duration)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  useEffect(() => {
    fetchingSettings()
  }, [])

  return { fetchingSettings, workduration } 
}
