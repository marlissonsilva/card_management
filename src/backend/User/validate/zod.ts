import { z } from "zod"

export const authenticateSchema = z.object({
  email: z.email({ message: "Insira um email válido" }),
  password: z.string({ message: "A senha é obrigatória" })
})

export const userSchema = z.object({
  username: z.string({ message: "Informa seu nome" }),
  email: z.email({ message: "Insira um email válido" }),
  password: z.string({ message: "Crie uma senha forte" }),
  invoice_closing: z.number({ message: "Informe a data de fechamento da sua fatura" })
})

export type AuthFormData = z.infer<typeof authenticateSchema>

export type UserFormData = z.infer<typeof userSchema>

