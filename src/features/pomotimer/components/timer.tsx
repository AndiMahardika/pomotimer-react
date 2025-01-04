import { Button } from "@/components/ui/button";
import { ChevronsRight, Pause, Play, RotateCcw } from "lucide-react";
import useSetting from "../hooks/useSetting";
import { useEffect, useState } from "react";
import useTimerStore from "@/store/useTmerStore";
import useTaskStore from "@/store/taskStore";

export default function Timer() {
  const { workduration, shortbreakduration } = useSetting();
  const { currentDuration, setCurrentDuration, workSession, setWorkSession, isRunning, setIsRunning } = useTimerStore();
  const { selectedTask } = useTaskStore();
  const [speed, setSpeed] = useState <number>(1);

  const handleReset = () => {
    setCurrentDuration(workSession ? workduration : shortbreakduration);
    setIsRunning(false);
    setWorkSession(true);
    setSpeed(1);
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleFastForward = () => {
    if ( speed === 3) {
      setSpeed(1);
    } else {
      setSpeed(speed + 1);
    }
  };

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        setCurrentDuration(currentDuration - 1);
      }, 1000 / speed);

      return () => clearTimeout(timer);
    }
  }, [isRunning, currentDuration, setCurrentDuration, speed]);

  useEffect(() => {
    if (currentDuration === 0) {
      setWorkSession(!workSession);
      setCurrentDuration(workSession ? shortbreakduration : workduration);
    }
  }, [currentDuration, workSession, selectedTask, setWorkSession, setCurrentDuration, shortbreakduration, workduration]);  

  return (
    <div className="border-2 border-slate-300 rounded-md p-4 h-4/6 flex flex-col items-center justify-center space-y-9">
      <p className="text-2xl font-bold text-center text-slate-300">
        {workSession ? "Work Session" : "Break Session"}
      </p>
      <p className="text-9xl font-extrabold text-center text-slate-300">
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