import { Button } from "@/components/ui/button";
import { ChevronsRight, Pause, Play, RotateCcw } from "lucide-react";
import useTimer from "../hooks/useTimer";

export default function Timer() {
  const { handleFastForward, handleReset, handleStartPause, currentDuration, isRunning, speed, workSession } = useTimer();

  return (
    <div className="border-2 border-slate-100 bg-white rounded-md p-4 h-4/6 flex flex-col items-center justify-center space-y-9 shadow-sm">
      <p className={`text-2xl font-bold text-center ${workSession ? "text-blue-600" : "text-emerald-500"}`}>
        {workSession ? "Work Session" : "Break Session"}
      </p>
      <p className="text-7xl md:text-9xl font-extrabold text-center text-slate-900">
        {`${String(Math.floor(currentDuration / 60)).padStart(2, "0")}:${String(currentDuration % 60).padStart(2, "0")}`}
      </p>
      <div className="flex justify-center gap-x-4">
        <Button
          size={"icon"}
          className="bg-slate-100 hover:bg-blue-100 hover:text-blue-600 text-slate-700 transition-colors"
          onClick={handleReset}
        >
          <RotateCcw size={24} />
        </Button>
        <Button
          size={"icon"}
          className="bg-slate-100 hover:bg-blue-100 hover:text-blue-600 text-slate-700 transition-colors"
          onClick={handleStartPause}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </Button>
        <Button
          size={speed === 1 ? "icon" : "default"}
          className="bg-slate-100 hover:bg-blue-100 hover:text-blue-600 text-slate-700 transition-colors"
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