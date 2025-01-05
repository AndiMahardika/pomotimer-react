import Navbar from "@/components/share/navbar"
import Login from "@/features/auth/components/login"
import Signup from "@/features/auth/components/signup"
import Pomotimer from "@/features/pomotimer"
import ProtectedRoute from "@/middleware/ProtectedRoute"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Pomotimer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const Test = () => {

  return (
    <>
      <Navbar />
      <h1 className="text-3xl">Success Page</h1>
    </>
  )
}
