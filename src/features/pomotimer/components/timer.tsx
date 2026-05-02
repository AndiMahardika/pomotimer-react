import { Button } from "@/components/ui/button";
import { ChevronsRight, Pause, Play, RotateCcw } from "lucide-react";
import useTimer from "../hooks/useTimer";

export default function Timer() {
  const { handleFastForward, handleReset, handleStartPause, currentDuration, isRunning, speed, workSession } = useTimer();

  return (
    <div className="border-2 border-slate-100 bg-white rounded-md p-4 h-4/6 flex flex-col items-center justify-center space-y-9 shadow-sm">
      <p className={`text-2xl font-bold text-center ${workSession ? "text-[#3B7DF6]" : "text-[#3B7DF6]"}`}>
        {workSession ? "Work Session" : "Break Session"}
      </p>
      <p className="text-7xl md:text-9xl font-extrabold text-center text-slate-900">
        {`${String(Math.floor(currentDuration / 60)).padStart(2, "0")}:${String(currentDuration % 60).padStart(2, "0")}`}
      </p>
      <div className="flex justify-center gap-x-4">
        <Button
          size={"icon"}
          className="bg-[#ef4444] hover:bg-[#ef4444]/90 text-white shadow-sm transition-all"
          onClick={handleReset}
        >
          <RotateCcw size={24} />
        </Button>
        <Button
          size={"icon"}
          className={`${isRunning ? "bg-[#F4C724] hover:bg-[#F4C724]/90" : "bg-[#21A664] hover:bg-[#21A664]/90"} text-white shadow-sm transition-all`}
          onClick={handleStartPause}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </Button>
        <Button
          size={speed === 1 ? "icon" : "default"}
          className="bg-[#3B7DF6] hover:bg-[#3B7DF6]/90 text-white shadow-sm transition-all"
          onClick={handleFastForward}
        >
          {speed === 1 ? (
            <ChevronsRight size={24} />) 
          : (
            <>
              {speed}x
              <ChevronsRight size={24} />
            </>
          ) } 
        </Button>
      </div>
    </div>
  );
}