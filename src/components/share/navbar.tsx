import { Hourglass, Timer } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-3">
        <div className="flex items-center gap-x-2 text-3xl font-bold text-slate-300">
          <Hourglass size={32} />
          <h1>Pomotimer</h1>
        </div>
        <Button className="bg-green-500 hover:bg-green-600">
          <Link to="/login">Logout</Link>
        </Button>
      </div>
    </nav>
  )
}
