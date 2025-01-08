import { Button } from "@/components/ui/button";
import { ChevronsRight, Pause, Play, RotateCcw } from "lucide-react";
import useTimer from "../hooks/useTimer";

export default function Timer() {
  const { handleFastForward, handleReset, handleStartPause, currentDuration, isRunning, speed, workSession } = useTimer();

  return (
    <div className="border-2 border-slate-300 rounded-md p-4 h-4/6 flex flex-col items-center justify-center space-y-9">
      <p className="text-2xl font-bold text-center text-slate-300">
        {workSession ? "Work Session" : "Break Session"}
      </p>
      <p className="text-7xl md:text-9xl font-extrabold text-center text-slate-300">
        {`${String(Math.floor(currentDuration / 60)).padStart(2, "0")}:${String(currentDuration % 60).padStart(2, "0")}`}
      </p>
      <div className="flex justify-center gap-x-4">
        <Button
          size={"icon"}
          className="bg-slate-300 hover:bg-slate-400 hover:text-white text-slate-900"
          onClick={handleReset}
        >
          <RotateCcw size={24} />
        </Button>
        <Button
          size={"icon"}
          className="bg-slate-300 hover:bg-slate-400 hover:text-white text-slate-900"
          onClick={handleStartPause}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </Button>
        <Button
          size={speed === 1 ? "icon" : "default"}
          className="bg-slate-300 hover:bg-slate-400 hover:text-white text-slate-900"
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