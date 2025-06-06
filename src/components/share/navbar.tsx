import { Hourglass } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import useTimerStore from "@/store/useTmerStore";
import useAuth from "@/hooks/useAuth";
import useTaskStore from "@/store/taskStore";
import { supabase } from "@/utils/supabase";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { clearTasks, unselectTask } = useTaskStore();
  const { setCurrentDuration, setIsRunning, setWorkSession } = useTimerStore();
  const { selectedTask } = useTaskStore();

  const handleLogout = async () => {
    if (selectedTask !== null){
      unselectTaskDb(selectedTask.id)
    }

    unselectTask()
    clearTasks();
    setCurrentDuration(1500);
    setIsRunning(false);
    setWorkSession(true);
    await logout()
    navigate("/login")
  }

  async function unselectTaskDb(id: number) {
    const { error } = await supabase
      .from("task")
      .update({ is_selected: false })
      .eq("id", id);
  
    if (error) {
      throw error;
    }
  }
  
  return (
    <>
      <nav className="max-w-5xl mx-auto flex items-center justify-between p-3">
        <div className="flex items-center gap-x-2 text-3xl font-bold text-slate-300">
          <Hourglass size={32} />
          <h1>Pomotimer</h1>
        </div>

        {/* AlertDialog Trigger and Content */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Logout</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will end your current session and log you out of your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </nav>
    </>
  )
}
