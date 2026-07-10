"use server"

import bcrypt from "bcryptjs";
import { passwordValidate } from "../utils/password-validate";
import prisma from "@/src/lib/prisma";
import { userSchema } from "./validate/zod";

interface CreateUserProps {
  username: string
  email: string
  password: string
  invoice_closing: number
}

export async function CreateUser(formData: CreateUserProps): Promise<{ message: string }> {
  const validateUser = userSchema.safeParse(formData)
  if (!validateUser.success) {
    return { message: "Erro ao criar usuário" }
  }

  const { username, email, password, invoice_closing } = validateUser.data
  const isMatchPassword = passwordValidate(password)
  if (!isMatchPassword) {
    return { message: "A senha não atende ao critérios." }
  }

  try {
    const encrypt_password = await bcrypt.hash(password, 10)

    const data = {
      username,
      email,
      password: encrypt_password,
      invoice_closing
    }

    const result = await prisma.user.create({ data })
    console.log("result", result)
    return { message: "Usuário criado com sucesso" }
  } catch (error) {
    console.log(error)
    return { message: "Erro ao criar usuário" }
  }
}
