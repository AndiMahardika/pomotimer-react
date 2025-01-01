import { Timer } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-3">
        <div className="flex items-center gap-x-2 text-3xl font-bold text-slate-300">
          <Timer size={24} />
          <h1>Pomotimer</h1>
        </div>
        <Button className="bg-green-500 hover:bg-green-600">Login</Button>
      </div>
    </nav>
  )
}
