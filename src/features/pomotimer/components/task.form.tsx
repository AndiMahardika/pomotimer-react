import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import useTask from "../hooks/useTask";

export default function TaskForm() {
  const { isAdding, handleAddTask } = useTask()

  return (
    <form className="flex w-full items-center space-x-2 sticky top-0 bg-slate-700 px-4 py-4" onSubmit={handleAddTask}>
      <Input type="text" name="task" placeholder="Task..." className="bg-white" />
      <Button
        type="submit"
        className="bg-green-500 text-white hover:bg-green-600"
        disabled={isAdding}
      >
        {isAdding ? (
          <>
            <Loader2 className="animate-spin" /> 
            Loading
          </>
        ) : "Add Task"}
      </Button>
    </form>
  )
}
