import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TaskForm() {
  return (
    <form className="flex w-full items-center space-x-2 sticky top-0 bg-slate-700 px-4 py-4">
      <Input type="text" placeholder="Task" className="bg-white" />
      <Button
        type="submit"
        className="bg-green-500 text-white hover:bg-green-600"
      >
        add
      </Button>
    </form>
  )
}
