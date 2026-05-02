import { Button } from "@/components/ui/button";
import { ChevronsRight, Pause, Play, RotateCcw } from "lucide-react";
import useTimer from "../hooks/useTimer";
import useTaskStore from "@/store/taskStore";
import useTask from "../hooks/useTask";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Timer() {
  const {
    handleFastForward,
    handleReset,
    handleStartPause,
    currentDuration,
    isRunning,
    speed,
    workSession,
  } = useTimer();
  const { selectedTask } = useTaskStore();
  const { tasks } = useTask();

  const alternatingColors = [
    "text-[#8A56F6]",
    "text-[#22C5A9]",
    "text-[#F4C724]",
    "text-[#3B7DF6]",
  ];

  const selectedTaskIndex = tasks.findIndex((t) => t.id === selectedTask?.id);
  const activeColorClass =
    selectedTaskIndex !== -1
      ? alternatingColors[selectedTaskIndex % alternatingColors.length]
      : "text-[#3B7DF6]";

  return (
    <div className="border-2 border-slate-100 bg-white rounded-md p-4 h-4/6 flex flex-col items-center justify-center space-y-9 shadow-sm">
      <p className={`text-2xl font-bold text-center ${activeColorClass}`}>
        {workSession ? "Work Session" : "Break Session"}
      </p>
      <p className="text-7xl md:text-9xl font-extrabold text-center text-slate-900">
        {`${String(Math.floor(currentDuration / 60)).padStart(2, "0")}:${String(currentDuration % 60).padStart(2, "0")}`}
      </p>
      <div className="flex justify-center gap-x-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size={"icon"}
              className="bg-[#ef4444] hover:bg-[#ef4444]/90 text-white shadow-sm transition-all"
              onClick={isRunning ? undefined : handleReset}
            >
              <RotateCcw size={24} />
            </Button>
          </AlertDialogTrigger>
          {isRunning && (
            <AlertDialogContent className="bg-white text-slate-900 border-slate-100">
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Timer?</AlertDialogTitle>
                <AlertDialogDescription>
                  The timer is currently running. Resetting it will end the
                  current session and return the duration to default.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-black text-white hover:bg-slate-800 hover:text-white border-none">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleReset}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Reset Timer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialog>
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
            <ChevronsRight size={24} />
          ) : (
            <>
              {speed}x
              <ChevronsRight size={24} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
