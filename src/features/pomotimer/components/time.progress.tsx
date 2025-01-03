import { Progress } from "@/components/ui/progress";
import useSelectedTaskStore from "@/store/useSelectedTask";

export default function TimeProgress() {
  const { selectedTask } = useSelectedTaskStore();

  return (
    <div className="bg-slate-300 rounded-md px-4 p-6 h-2/6 flex flex-col justify-between text-slate-700">
      <div>
        <p className="text-3xl font-bold">Title Task {selectedTask?.task}</p>
        <p className="text-lg font-bold">Session</p>
      </div>
      <div>
        <div className="flex justify-between text-sm">
          <p>5 minutes remaining</p>
          <p className="font-bold">Next: Second Phase</p>
        </div>
        <Progress value={30} className="mt-2" />
      </div>
    </div>
  );
}
