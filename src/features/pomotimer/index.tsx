import Navbar from "@/components/share/navbar";
import Timer from "./components/timer";
import TimeProgress from "./components/time.progress";
import Task from "./components/task";

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
          <Task />
        </section>
      </section>
    </main>
  );
}
