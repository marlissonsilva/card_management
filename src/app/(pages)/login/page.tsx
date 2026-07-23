"use client"
import { FormUser } from "../../components/FormUser";

export default function page() {
  return (
    <main className="flex flex-col min-h-screen w-full justify-center items-center">
      <div className="w-md">
        <h1 className="text-center mb-4">Faça seu login, caso não tenha conta ainda, criei sua conta.</h1>
        <FormUser />
      </div>
    </main>
  )
}
