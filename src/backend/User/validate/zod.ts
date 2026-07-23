import { z } from "zod"

export const authenticateSchema = z.object({
  email: z.email({ message: "Insira um email válido" }),
  password: z.string().min(8, { message: "A senha é obrigatória" }),
})

export const userSchema = z.object({
  username: z.string().min(3, { message: "Informa seu nome" }),
  email: z.email({ message: "Insira um email válido" }),
  password: z.string().min(8, { message: "Crie uma senha forte" }),
  invoice_closing: z.number({ message: "Informe a data de fechamento da sua fatura" })
    .min(1, { message: "Data não poder menor que 1" })
    .max(31, { message: "Data não pode ser maior que 31" })
})

export type AuthFormData = z.infer<typeof authenticateSchema>

export type UserFormData = z.infer<typeof userSchema>

export type CombinedFormData = AuthFormData & Partial<UserFormData>;

