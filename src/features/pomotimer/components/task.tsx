import TaskForm from "./task.form";
import TaskItem from "./task.item";
import { images } from "@/assets/images/image";
import TaskSkeleton from "./task.skeleton";
import useTask from "../hooks/useTask";

export default function Task() {
  const { tasks, isLoading } = useTask()

  return (
    <div className="col-span-1 bg-slate-700 border-2 border-slate-300 rounded-md overflow-y-scroll">
      <TaskForm />
      <section className="px-4 flex flex-col gap-y-2">
        {isLoading ? (
          <>
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </>
        ) : (tasks.length === 0) ? (
            <img src={images.addtask} alt="" className="w-80 rounded-md mx-auto my-20" />
        ) : (
          tasks.map((task) => (
            <TaskItem key={task.id} data={task} />
          ))
        )}
      </section>
    </div>
  );
}
