"use client"
import { ArrowRight, CreditCard } from 'lucide-react'
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className='absolute top-8 flex w-full justify-start md:max-w-6xl items-center gap-2'>
        <CreditCard />
        <span className='text-xl'>Card Management</span>
      </div>
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-10">
        <div className="flex flex-col gap-6 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Calcule facilmente os valores do seu cartão de crédito compartilhado
          </h1>
          <p className="text-lg text-muted-foreground">
            Para você que compartilha seu cartão e sempre precisa calcular
            quanto cada pessoa deve pagar, criamos a solução perfeita para
            facilitar sua vida.
          </p>
          <Link href="/login" className="">
            <button
              className="flex items-center gap-2 px-20 py-2 text-lg text-left border w-auto rounded-xl"
            >
              Começar agora
              <ArrowRight />
            </button>
          </Link>
        </div>

        <div className="shrink-0">
        </div>
      </section>
    </main>)
}

