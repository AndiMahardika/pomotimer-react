import { Hourglass } from "lucide-react";
import React from "react";

export default function AuthLayout({ children } : React.PropsWithChildren) {

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen font-inter">
      <section className="bg-slate-700 p-8 md:flex flex-col justify-between hidden">
        <h3 className="text-3xl font-bold text-slate-300 flex gap-x-2">
          <Hourglass size={32} />
          Pomotimer
        </h3>
        <p className="text-slate-300 font-medium">
        "Pomotimer helps you stay focused and productive. Plan your work sessions effectively, with breaks to recharge and maintain concentration. Achieve more with the right strategy!"
        </p>
      </section>
      {children}
    </main>
  )
}
