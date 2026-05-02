import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tasks } from "@/utils/entity";
import { CircleCheckBig, FilePenLine, Loader2, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useTask from "../hooks/useTask";

interface TaskProps {
  data: Tasks;
  index: number;
  loading?: boolean;
  handleDeleteTask?: () => void;
  handleUpdateTask?: (_id: string, _title: string) => void;
}

const alternatingColors = [
  { hex: "#8A56F6", bg: "bg-[#8A56F6]", text: "text-white" }, // Purple
  { hex: "#22C5A9", bg: "bg-[#22C5A9]", text: "text-white" }, // Teal
  { hex: "#F4C724", bg: "bg-[#F4C724]", text: "text-white" }, // Yellow
  { hex: "#3B7DF6", bg: "bg-[#3B7DF6]", text: "text-white" }, // Blue
];

export default function TaskItem({
  data,
  index,
  loading,
  handleDeleteTask,
  handleUpdateTask,
}: TaskProps) {
  const { handleSelectTask } = useTask();
  const [newTaskTitle, setNewTaskTitle] = useState(data.task);

  const colorScheme = alternatingColors[index % alternatingColors.length];

  const handleSaveChanges = () => {
    if (handleUpdateTask && data.id) {
      handleUpdateTask(data.id, newTaskTitle);
    }
  };

  return (
    <div
      onClick={() => data.id && handleSelectTask(data.id, !!data.is_selected)}
      className={`flex items-center justify-between rounded-md py-1 px-4 gap-x-2 border-none font-semibold transition-all cursor-pointer ${colorScheme.bg} ${data.is_selected && "ring-2 ring-white/50 shadow-md"}`}
    >
      <div className="flex items-center w-full gap-x-3">
        <div className="w-fit relative flex items-center justify-center">
          <Checkbox
            checked={data.is_selected}
            onCheckedChange={() =>
              data.id && handleSelectTask(data.id, !!data.is_selected)
            }
            className="absolute opacity-0 cursor-pointer w-6 h-6"
          />
          <CircleCheckBig
            size={24}
            className={`transition-colors ${data.is_selected ? "text-white" : "text-white/40"}`}
          />
        </div>
        <p
          className={`text-sm md:text-base w-5/6 line-clamp-2 ${colorScheme.text}`}
        >
          {data.task}
        </p>
      </div>
      <div
        className="flex items-center gap-x-1"
        onClick={(e) => e.stopPropagation()} // Mencegah pemilihan task saat klik area tombol
      >
        <p className={`text-xs ${colorScheme.text} text-nowrap mr-2`}>
          {data.pomo_count} Pomos
        </p>

        {/* Edit */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size={"icon"}
              className="bg-white hover:bg-white text-amber-500 shadow-sm h-8 w-8 shrink-0"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <FilePenLine size={16} />
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white text-slate-900 border-slate-100">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Update the details of your task below.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                id="task"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="bg-slate-50 border-slate-200"
                autoComplete="off"
              />
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button
                  type="submit"
                  className="bg-[#3B7DF6] hover:bg-[#3B7DF6]/90 text-white"
                  onClick={handleSaveChanges}
                >
                  Save changes
                </Button>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size={"icon"}
              className="bg-white hover:bg-white text-red-600 shadow-sm h-8 w-8 shrink-0"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white text-slate-900 border-slate-100">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this task?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-black text-white hover:bg-slate-800 hover:text-white border-none">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteTask}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
