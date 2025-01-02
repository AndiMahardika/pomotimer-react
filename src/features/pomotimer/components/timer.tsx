import { Button } from "@/components/ui/button";
import useTaskStore from "@/store/taskStore";
import useTimerStore from "@/store/useTimer";
import { console } from "inspector";
import { ChevronsRight, Play, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import useSetting from "../hooks/useSetting";

export default function Timer() {
  const { selectedTaskId } = useTaskStore();
  const { workduration } = useSetting();
  // const { workduration, shortbreakduration, longbreakduration } = useTimerStore();

  return (
    <div className="border-2 border-slate-300 rounded-md p-4 h-4/6 flex flex-col items-center justify-center space-y-9">
      <p className="text-2xl font-bold text-center text-slate-300">
        Work Session {selectedTaskId}
      </p>
      <p className="text-9xl font-extrabold text-center text-slate-300">
        {Math.floor(workduration / 60)}:{workduration % 60}
      </p>
      <div className="flex justify-center gap-x-4">
        <Button
          size={"icon"}
          className="bg-slate-300 hover:bg-slate-400 hover:text-white text-slate-900"
        >
          <RotateCcw size={24} />
        </Button>
        <Button
          size={"icon"}
          className="bg-slate-300 hover:bg-slate-400 hover:text-white text-slate-900"
        >
          <Play size={24} />
        </Button>
        <Button
          size={"icon"}
          className="bg-slate-300 hover:bg-slate-400 hover:text-white text-slate-900"
        >
          <ChevronsRight size={24} />
        </Button>
      </div>
    </div>
  );
}
