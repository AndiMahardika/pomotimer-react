import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useTaskStore from "@/store/taskStore";
import { Tasks } from "@/utils/entity";
import { supabase } from "@/utils/supabase";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface TaskProps {
  data: Tasks;
  loading?: boolean
  handleDeleteTask?: () => void
}

export default function TaskItem({data, loading, handleDeleteTask} : TaskProps) {
  const [isChecked, setIsChecked] = useState<boolean>(data.is_selected);
  const { selectTask } = useTaskStore();

  const handleSelectTask = async (id: number, currentSelected: boolean) => {
    try {
      setIsChecked(!currentSelected)
      console.log(currentSelected)

      const { data, error } = await supabase
        .from('task')
        .update({is_selected: !currentSelected})
        .eq('id', id)
        .select()

      if (error) {
        throw error;
      }

      if(!currentSelected){
        selectTask(id)
      } else {
        selectTask(null)
      }

    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <div className="flex items-center justify-between rounded-md py-1 px-2 bg-white font-semibold text-slate-900">
      <p className="">{data.task}</p>
      <div className="flex items-center gap-x-2">
        <p className="text-sm">{data.pomo_count} Pomos</p>
        <Checkbox checked={isChecked} onCheckedChange={() => handleSelectTask(data.id, isChecked)} />
        <Button size={"icon"} variant={"destructive"} disabled={loading} onClick={handleDeleteTask}>
          {loading ? <Loader2 className="animate-spin" size={24} /> : <Trash2 size={24} />}
        </Button>
      </div>
    </div>
  );
}
