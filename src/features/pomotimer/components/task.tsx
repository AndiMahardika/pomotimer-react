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
    setSearchQuery 
  } = useTask()

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="col-span-1 bg-slate-700 border-2 border-slate-300 rounded-md flex flex-col h-full max-h-[600px]">
      {/* Header with Search and Add Button */}
      <div className="p-4 bg-slate-800 border-b border-slate-600 flex items-center gap-2 sticky top-0 z-10">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input 
            type="text" 
            placeholder="Search tasks..." 
            className="pl-8 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="icon" className="bg-green-500 hover:bg-green-600 h-9 w-9 shrink-0">
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white border-slate-700">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription className="text-slate-400">
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
      <section className="px-4 py-4 flex flex-col gap-y-2 overflow-y-auto">
        {isLoading ? (
          <>
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </>
        ) : (tasks.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-10 opacity-50">
              <img src={images.addtask} alt="No tasks" className="w-48 mb-4" />
              <p className="text-slate-400 text-sm italic">
                {searchQuery ? "No matching tasks found" : "No tasks yet. Click + to add one!"}
              </p>
            </div>
        ) : (
          tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              data={task} 
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
