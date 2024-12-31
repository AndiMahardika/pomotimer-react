import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChevronsRight, Play, RotateCcw, Trash2 } from "lucide-react";

export default function Pomotimer() {
  return (
    <main className="bg-slate-700">
    <section className="max-w-5xl mx-auto grid min-h-screen grid-cols-2 py-4 font-roboto">

      <div className="col-span-1 flex justify-center items-center flex-col space-y-9 bg-slate-700 border-2 border-r border-slate-300 rounded-s-md">
        <h1 className="text-5xl font-bold text-center text-slate-300">Pomotimer</h1>
        {/* timer */}
        <p className="text-8xl font-semibold text-center text-slate-300">24:00:00</p>

        <div className="flex justify-center gap-x-4">
          <Button size={"icon"} variant={"destructive"}>
            <RotateCcw size={24} />
          </Button>

          <Button size={"icon"} variant={"destructive"}>
            <Play size={24} />
          </Button>

          <Button size={"icon"} variant={"destructive"}>
            <ChevronsRight size={24} />
          </Button>
        </div>

        <Progress value={33} className="w-4/5" />

      </div>

      {/* Todo */}
      <div className="col-span-1 p-4 bg-slate-700 border-2 border-l border-slate-300 rounded-e-md">
        <div className="flex w-full items-center space-x-2">
          <Input type="text" placeholder="Task" className="bg-white" />
          <Button type="submit" className="bg-green-500 text-white hover:bg-green-600">add</Button>
        </div>

        {/* list */}
        <section className="space-y-2 mt-2">
          <div className="flex items-center justify-between rounded-md py-1 px-2 bg-white">
            <p className="">Makan Malam</p>
            <div className="flex items-center gap-x-2">
              <Checkbox />  
              <Button size={"icon"} variant={"destructive"}>
                <Trash2 size={24} />
              </Button>
            </div>
          </div>
        </section>

      </div>

    </section>
    </main>

  )
}
