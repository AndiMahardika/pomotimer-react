import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useTaskStore from "@/store/taskStore";
import { Tasks } from "@/utils/entity";
import { supabase } from "@/utils/supabase";
import { Loader2, Trash2 } from "lucide-react";
import useSetting from "../hooks/useSetting";
import useTimerStore from "@/store/useTmerStore";

interface TaskProps {
  data: Tasks;
  loading?: boolean;
  handleDeleteTask?: () => void;
}

export default function TaskItem({ data, loading, handleDeleteTask }: TaskProps) {
  const { selectTask, tasks, setTasks, unselectTask } = useTaskStore();
  const { workduration } = useSetting()
  const { setWorkSession, setCurrentDuration, setIsRunning } = useTimerStore()

  const handleSelectTask = async (id: number, currentSelected: boolean) => {
    try {
      if (currentSelected) {
        // Unselect current task
        const { error } = await supabase
          .from("task")
          .update({ is_selected: false })
          .eq("id", id);

        if (error) throw error;

        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, is_selected: false } : task
        );

        setTasks(updatedTasks);
        setCurrentDuration(workduration)
        setIsRunning(false)
        unselectTask();
      } else {
        // Unselect tasks local storage
        const updatedTasks = tasks.map((task) =>
          task.id === id
            ? { ...task, is_selected: true }
            : { ...task, is_selected: false }
        );

        // Unselect tasks in Supabase
        const taskIds = tasks.map((task) => task.id);
        const { error: unselectError } = await supabase
          .from("task")
          .update({ is_selected: false })
          .in("id", taskIds);

        if (unselectError) throw unselectError;

        // Select task in Supabase
        const { data: dataSelectedTask, error: selectError } = await supabase
          .from("task")
          .update({ is_selected: true })
          .eq("id", id)
          .select("*")
          .single();

        if (selectError) throw selectError;

        setCurrentDuration(workduration);
        setWorkSession(dataSelectedTask.workSession ?? true);
        setIsRunning(false);

        setTasks(updatedTasks);
        selectTask(dataSelectedTask.id);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md py-1 px-2 bg-white font-semibold text-slate-900">
      <p className="">{data.task}</p>
      <div className="flex items-center gap-x-2">
        <p className="text-xs md:text-sm">{data.pomo_count} Pomos</p>
        <Checkbox
          checked={data.is_selected}
          onCheckedChange={() => handleSelectTask(data.id, data.is_selected)}
        />
        <Button
          size={"icon"}
          variant={"destructive"}
          disabled={loading}
          onClick={handleDeleteTask}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <Trash2 size={24} />
          )}
        </Button>
      </div>
    </div>
  );
}