import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface TaskFormProps {
  loading: boolean
  handleAddTask: (_e: React.FormEvent) => void
  onSuccess?: () => void
}

export default function TaskForm( { loading, handleAddTask, onSuccess }: TaskFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    await handleAddTask(e);
    if (onSuccess) onSuccess();
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label htmlFor="task" className="text-sm font-medium">Task Title</label>
        <Input id="task" type="text" name="task" placeholder="What are you working on?" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" required />
      </div>
      <Button
        type="submit"
        className="bg-green-500 text-white hover:bg-green-600 w-full"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" /> 
            Adding...
          </>
        ) : "Add Task"}
      </Button>
    </form>
  )
}
