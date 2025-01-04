import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import useSetting from "../hooks/useSetting";
import useTask from "../hooks/useTask";
import useTaskStore from "@/store/taskStore";
import useTimerStore from "@/store/useTmerStore";

// Fungsi untuk mengonversi angka ke nama fase
function getPhaseName(phaseNumber: number): string {
  const phases = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
    "Tenth",
  ];
  return phases[phaseNumber - 1] || `${phaseNumber}th`;
}

export default function TimeProgress() {
  const [progress, setProgress] = useState(0);
  const { workduration } = useSetting();
  const { handlePomosCount } = useTask()
  const { selectedTask } = useTaskStore()
  const { currentDuration, workSession } = useTimerStore();

  useEffect(() => {
    // Update progress bar
    setProgress(((workduration - currentDuration) / workduration) * 100);
  }, [currentDuration, workduration]);

  // Hitung fase saat ini dan fase berikutnya
  const currentPhase = selectedTask?.pomo_count
    ? `${getPhaseName(selectedTask.pomo_count)} Phase`
    : "No Phase";

  const nextPhase = selectedTask?.pomo_count
    ? `${getPhaseName(selectedTask.pomo_count + 1)} Phase`
    : "First Phase";

    useEffect(() => {
      if (currentDuration === 0 && selectedTask) {
        if (workSession) {
          handlePomosCount(selectedTask.id, selectedTask.pomo_count + 1);
        }
      }
    }, [currentDuration, workSession, selectedTask, handlePomosCount]);    


  return (
    <div className="bg-slate-300 rounded-md px-4 p-6 h-2/6 flex flex-col justify-between text-slate-700">
      <div>
        <p className="text-3xl font-bold">{selectedTask?.task || "No Task Selected"}</p>
        <p className="text-lg font-bold">{workSession ? currentPhase : "Break Session"}</p>
      </div>
      <div>
        <div className="flex justify-between text-sm">
          <p>{Math.ceil(currentDuration / 60)} minutes remaining</p>
          <p className="font-bold">{workSession ? `Next: ${nextPhase}` : "Work Session"}</p>
        </div>
        <Progress value={progress} className="mt-2" />
      </div>
    </div>
  );
}
