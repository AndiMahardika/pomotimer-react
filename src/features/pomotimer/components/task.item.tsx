import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useTaskStore from "@/store/taskStore";
import { Tasks } from "@/utils/entity";
import { supabase } from "@/utils/supabase";
import { FilePenLine, Loader2, Trash2 } from "lucide-react";
import useSetting from "../hooks/useSetting";
import useTimerStore from "@/store/useTmerStore";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TaskProps {
  data: Tasks;
  loading?: boolean;
  handleDeleteTask?: () => void;
  handleUpdateTask?: (id: number, title: string) => void;
}

export default function TaskItem({ data, loading, handleDeleteTask, handleUpdateTask }: TaskProps) {
  const { selectTask, tasks, setTasks, unselectTask } = useTaskStore();
  const { workduration } = useSetting()
  const { setWorkSession, setCurrentDuration, setIsRunning } = useTimerStore()

  const [newTaskTitle, setNewTaskTitle] = useState(data.task);

  const handleSaveChanges = () => {
    if (handleUpdateTask) {
      handleUpdateTask(data.id, newTaskTitle);
    }
  };

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
      <div className="flex items-center gap-x-1">
        <p className="text-xs md:text-sm">{data.pomo_count} Pomos</p>
        <Checkbox
          checked={data.is_selected}
          onCheckedChange={() => handleSelectTask(data.id, data.is_selected)}
        />

        {/* Edit */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"icon"} className="bg-slate-700 hover:bg-slate-800">
              { loading ? <Loader2 className="animate-spin" /> : <FilePenLine /> }
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Update the details of your task below. Once you're finished, click save to apply the changes.
              </DialogDescription>
            </DialogHeader>
            <div className="">
              <Input id="task" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} className="col-span-3" autoComplete="off" />
            </div>
            <DialogFooter>
            <DialogTrigger asChild>
              <Button type="submit" size={"sm"} onClick={handleSaveChanges}>Save changes</Button>
            </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size={"icon"} variant={"destructive"}>
              { loading ? <Loader2 className="animate-spin" /> : <Trash2 />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this task?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone and will permanently remove the task from your list.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteTask}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}