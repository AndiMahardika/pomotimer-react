import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tasks } from "@/utils/entity";
import { Trash2 } from "lucide-react";

interface TaskProps {
  data: Tasks;
}

export default function TaskItem({data} : TaskProps) {
  return (
    <div className="flex items-center justify-between rounded-md py-1 px-2 bg-white font-semibold text-slate-900">
      <p className="">{data.task}</p>
      <div className="flex items-center gap-x-2">
        <p className="text-sm">{data.pomo_count} Pomos</p>
        <Checkbox />
        <Button size={"icon"} variant={"destructive"}>
          <Trash2 size={24} />
        </Button>
      </div>
    </div>
  );
}
