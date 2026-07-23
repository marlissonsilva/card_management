import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { authenticateSchema, CombinedFormData, userSchema } from "@/src/backend/User/validate/zod"
import { useState } from 'react'
import { authenticate } from '@/src/backend/User/authenticate'
import { createUser } from '@/src/backend/User/create'
import { useRouter } from 'next/navigation'

export function FormUser() {
  const [action, setAction] = useState<"login" | "account">("login")

  const isLogin = action === 'login'
  const schema = isLogin ? authenticateSchema : userSchema
  const route = useRouter()

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<CombinedFormData>({
    resolver: zodResolver(schema)
  })
  const onSubmit = async (formData: CombinedFormData) => {
    if (isLogin) {
      const response = await authenticate({ email: formData.email, password: formData.password })
      if (response.success) {
        route.push("/dashboard")
      }
    } else {
      const response = await createUser({
        username: formData.username || '',
        email: formData.email,
        password: formData.password,
        invoice_closing: formData.invoice_closing || 1,
      })
      if (response.success) {
        setAction("login")
      }
    }
  }

  return (
    <section>
      <div className='flex w-full border rounded-sm overflow-hidden'>
        <button
          className={`p-2 flex-1 -mr-6 [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)] 
                      ${!isLogin ? "bg-gray-500 text-white font-semibold" : ""}`}
          onClick={() => {
            setAction("account")
            reset()
          }}
        >
          <span className="inline-block italic">Criar conta</span>
        </button>
        <button
          className={`p-2 flex-1 [clip-path:polygon(10%_0%,100%_0%,100%_100%,0%_100%)]  
                      ${isLogin ? "bg-gray-500 text-white font-semibold" : ""}`}
          onClick={() => {
            setAction("login")
            reset()
          }}>
          <span className="inline-block italic">Fazer login</span>
        </button>
      </div>
      <form className="w-md flex flex-col justify-center py-4 gap-3" onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && <div className="flex flex-col">
          <label>Digite seu nome
            <input type="text" {...register("username")} />
          </label>
          {errors.username?.message && <span className='text-red-600 text-sm' >{errors.username?.message}</span>}
        </div>}
        <div className="flex flex-col">
          <label>Digite seu email
            <input type="email" {...register('email')} />
          </label>
          {errors.email?.message && <span className='text-red-600 text-sm'>{errors.email?.message}</span>}
        </div>
        <div className="flex flex-col">
          <label>Digite sua senha
            <input type="text" {...register("password")} />
          </label>
          {errors.password?.message && <span className='text-red-600 text-sm'>{errors.password?.message}</span>}
        </div>
        {!isLogin && <div className="flex flex-col">
          <label>Data de fechamento da fatura
            <input type="number" min="1" max="31" onChange={(event) => setValue("invoice_closing", Number(event.target.value))} />
          </label>
          {errors.invoice_closing?.message && <span className='text-red-600 text-sm'>{errors.invoice_closing?.message}</span>}
        </div>}
        <button type='submit' className='border p-4 rounded-sm mt-2'>{action === "account" ? "Criar conta" : "Fazer login"}</button>
      </form>
    </section>

  )
}
