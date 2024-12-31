import Pomotimer from "@/features/pomotimer"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pomotimer />} />
      </Routes>
    </BrowserRouter>
  )
}
