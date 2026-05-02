import TaskForm from "./task.form";
import TaskItem from "./task.item";
import { images } from "@/assets/images/image";
import TaskSkeleton from "./task.skeleton";
import useTask from "../hooks/useTask";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function Task() {
  const {
    tasks,
    isLoading,
    isAdding,
    handleAddTask,
    isDeleting,
    handleDeleteTask,
    handleUpdateTask,
    searchQuery,
    setSearchQuery,
  } = useTask();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="col-span-1 bg-white border border-slate-100 rounded-md flex flex-col h-full overflow-hidden shadow-sm">
      {/* Header with Search and Add Button */}
      <div className="p-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2 sticky top-0 z-10">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search tasks..."
            className="pl-8 bg-white border-slate-200 text-slate-700 placeholder:text-slate-400 h-9 focus-visible:ring-blue-600/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="bg-[#3B7DF6] hover:bg-[#3B7DF6]/90 text-white h-9 w-9 shrink-0 transition-all shadow-sm"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white text-slate-900 border-slate-100">
            <DialogHeader>
              <DialogTitle className="text-slate-900">Add New Task</DialogTitle>
              <DialogDescription className="text-slate-500">
                Create a new task to track your focus sessions.
              </DialogDescription>
            </DialogHeader>
            <TaskForm
              loading={isAdding}
              handleAddTask={handleAddTask}
              onSuccess={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Task List */}
      <section className="p-2 flex flex-col gap-y-2 overflow-y-auto flex-1">
        {isLoading ? (
          <>
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-10">
            <img src={images.addtask} alt="No tasks" className="w-48 mb-4" />
            <p className="text-slate-600 text-sm italic">
              {searchQuery
                ? "No matching tasks found"
                : "No tasks yet. Click + to add one!"}
            </p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              data={task}
              index={index}
              loading={isDeleting}
              handleDeleteTask={() => task.id && handleDeleteTask(task.id)}
              handleUpdateTask={(id, title) => handleUpdateTask(id, title)}
            />
          ))
        )}
      </section>
    </div>
  );
}
