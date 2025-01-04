import Login from "@/features/auth/components/login"
import Signup from "@/features/auth/components/signup"
import Pomotimer from "@/features/pomotimer"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Pomotimer />} /> */}
        <Route path="/" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

const Test = () => {
  return (
    <h1 className="text-3xl">Success Page</h1>
  )
}
