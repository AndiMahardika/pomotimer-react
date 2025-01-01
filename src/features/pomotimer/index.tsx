import TaskItem from "./components/task.item";
import Navbar from "@/components/share/navbar";
import TaskForm from "./components/task.form";
import Timer from "./components/timer";
import TimeProgress from "./components/time.progress";

export default function Pomotimer() {
  return (
    <main className="bg-slate-700">
      <section className="max-w-5xl mx-auto min-h-screen font-inter">
        <Navbar/>
        <section className="grid grid-cols-2 gap-x-2 h-[90vh] pb-1">
          {/* Timer */}
          <div className="col-span-1 flex flex-col gap-y-2">
            <Timer />
            <TimeProgress />
          </div>
          {/* Todo */}
          <div className="col-span-1 bg-slate-700 border-2 border-slate-300 rounded-md overflow-y-scroll">
            <TaskForm />
            <section className="px-4 flex flex-col gap-y-2">
              <TaskItem />
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}
