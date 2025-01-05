import { Hourglass } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const confirm = window.confirm("Are you sure you want to logout?");

    if (!confirm) return;

    await logout()
    navigate("/login")
  }

  return (
    <nav className="">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-3">
        <div className="flex items-center gap-x-2 text-3xl font-bold text-slate-300">
          <Hourglass size={32} />
          <h1>Pomotimer</h1>
        </div>
        <Button className="bg-green-500 hover:bg-green-600" onClick={handleLogout}>
          <Link to="/login">Logout</Link>
        </Button>
      </div>
    </nav>
  )
}
