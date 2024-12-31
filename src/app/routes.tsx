import Test from "@/features/test.component"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}
