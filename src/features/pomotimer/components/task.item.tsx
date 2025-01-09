import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tasks } from "@/utils/entity";
import { CircleCheckBig, FilePenLine, Loader2, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useTask from "../hooks/useTask";

interface TaskProps {
  data: Tasks;
  loading?: boolean;
  handleDeleteTask?: () => void;
  handleUpdateTask?: (id: number, title: string) => void;
}

export default function TaskItem({ data, loading, handleDeleteTask, handleUpdateTask }: TaskProps) {
  const { handleSelectTask } = useTask()

  const [newTaskTitle, setNewTaskTitle] = useState(data.task);

  const handleSaveChanges = () => {
    if (handleUpdateTask) {
      handleUpdateTask(data.id, newTaskTitle);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md py-1 px-2 gap-x-2 bg-white font-semibold text-slate-900">
      <div className="flex items-center w-full gap-x-2">
        <div className="w-fit relative">
          <Checkbox
            checked={data.is_selected}
            onCheckedChange={() => handleSelectTask(data.id, data.is_selected)}
            className="absolute opacity-0 cursor-pointer"
          />
          <CircleCheckBig
            size={24}
            className={`cursor-pointer ${data.is_selected ? 'text-green-500' : 'text-slate-400'}`}
            onClick={() => handleSelectTask(data.id, data.is_selected)}
          />
        </div>
        <p className="text-sm md:text-base w-5/6 line-clamp-2">{data.task}</p>
      </div>
      <div className="flex items-center gap-x-1">
        <p className="text-xs md:text-sm text-nowrap">{data.pomo_count} Pomos</p>

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