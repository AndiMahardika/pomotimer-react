import TaskForm from "./task.form";
import TaskItem from "./task.item";
import { images } from "@/assets/images/image";
import TaskSkeleton from "./task.skeleton";
import useTask from "../hooks/useTask";

export default function Task() {
  const { tasks, isLoading, isAdding, handleAddTask, isDeleting, handleDeleteTask, handleUpdateTask  } = useTask()

  return (
    <div className="col-span-1 bg-slate-700 border-2 border-slate-300 rounded-md overflow-y-scroll">
      <TaskForm loading={isAdding} handleAddTask={handleAddTask} />
      <section className="px-4 flex flex-col gap-y-2">
        {isLoading ? (
          <>
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </>
        ) : (tasks.length === 0) ? (
            <img src={images.addtask} alt="" className="w-64 md:w-80 rounded-md mx-auto md:my-20" />
        ) : (
          tasks.map((task) => (
            <TaskItem key={task.id} data={task} loading={isDeleting} handleDeleteTask={() => handleDeleteTask(task.id)} handleUpdateTask={(id, title) => handleUpdateTask(id, title)}  />
          ))
        )}
      </section>
    </div>
  );
}
