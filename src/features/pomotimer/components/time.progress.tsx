import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import useSetting from "../hooks/useSetting";
import useTask from "../hooks/useTask";
import useTaskStore from "@/store/taskStore";
import useTimerStore from "@/store/useTmerStore";
import { getPhaseName } from "@/utils/phaseUtils";

export default function TimeProgress() {
  const [progress, setProgress] = useState(0);
  const { workduration, shortbreakduration } = useSetting();
  const { handlePomosCount } = useTask()
  const { selectedTask } = useTaskStore()
  const { currentDuration, workSession } = useTimerStore();

  useEffect(() => {
    // Update progress bar
    if (workSession) {
      setProgress(((workduration - currentDuration) / workduration) * 100);
    } else {
      setProgress(((shortbreakduration - currentDuration) / shortbreakduration) * 100);
    }
  }, [currentDuration, workduration, shortbreakduration, workSession]);

  // Hitung fase saat ini dan fase berikutnya
  const currentPhase = selectedTask?.pomo_count
    ? `${getPhaseName(selectedTask.pomo_count)} Phase`
    : "No Phase";

  const nextPhase = selectedTask?.pomo_count
    ? `${getPhaseName(selectedTask.pomo_count + 1)} Phase`
    : "First Phase";

  useEffect(() => {
    if (currentDuration === 0 && selectedTask) {
      if (workSession && selectedTask.id) {
        handlePomosCount(selectedTask.id, selectedTask.pomo_count + 1);
      }
    }
  }, [currentDuration, workSession, selectedTask, handlePomosCount]);    


  return (
    <div className="bg-blue-50 border border-blue-100 rounded-md px-4 p-4 md:p-6 h-2/6 flex flex-col justify-between shadow-sm">
      <div>
        <p className="text-2xl md:text-3xl font-bold text-blue-900">{selectedTask?.task || "No Task Selected"}</p>
        <p className="text-base md:text-lg font-bold text-blue-600">{workSession ? currentPhase : "Break Session"}</p>
      </div>
      <div>
        <div className="flex justify-between text-sm text-slate-500 mb-1">
          <p>{Math.ceil(currentDuration / 60)} minutes remaining</p>
          <p className="font-bold text-slate-700">{workSession ? `Next: ${nextPhase}` : "Work Session"}</p>
        </div>
        <Progress value={progress} className="bg-slate-200" indicatorClassName="bg-blue-600" />
      </div>
    </div>
  );
}
