import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tasks } from "@/utils/entity";
import { Loader2, Trash2 } from "lucide-react";

interface TaskProps {
  data: Tasks;
  loading?: boolean
  handleDeleteTask?: () => void
}

export default function TaskItem({data, loading, handleDeleteTask} : TaskProps) {
  return (
    <div className="flex items-center justify-between rounded-md py-1 px-2 bg-white font-semibold text-slate-900">
      <p className="">{data.task}</p>
      <div className="flex items-center gap-x-2">
        <p className="text-sm">{data.pomo_count} Pomos</p>
        <Checkbox />
        <Button size={"icon"} variant={"destructive"} disabled={loading} onClick={handleDeleteTask}>
          {loading ? <Loader2 className="animate-spin" size={24} /> : <Trash2 size={24} />}
        </Button>
      </div>
    </div>
  );
}
