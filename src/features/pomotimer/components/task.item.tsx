import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

export default function TaskItem() {
  return (
    <div className="flex items-center justify-between rounded-md py-1 px-2 bg-white font-semibold text-slate-900">
      <p className="">Makan Malam</p>
      <div className="flex items-center gap-x-2">
        <p className="text-sm">1 Pomos</p>
        <Checkbox />
        <Button size={"icon"} variant={"destructive"}>
          <Trash2 size={24} />
        </Button>
      </div>
    </div>
  );
}
