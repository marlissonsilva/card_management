"use server"

import prisma from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

const authenticateForm = z.object({
  email: z.email({ message: "Insira um email válido" }),
  password: z.string({ message: "A senha é obrigatória" })
})

export interface AuthenticateProps {
  email: string,
  password: string
}

export async function authenticate(formaData: AuthenticateProps): Promise<{ success: boolean, message?: string }> {

  const validateFields = authenticateForm.safeParse(formaData);
  if (!validateFields.success) {
    return { success: false, message: "Dados de login inválidos" }
  }

  const { email, password } = validateFields.data;

  try {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return { success: false, message: "Usuário não encontrado" }
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) {
      return { success: false, message: "Senha inválida" }
    }

    const payload = {
      uuid: user.uuid,
      email: user.email,
      username: user.username
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Erro na secret")
    }

    const token = jwt.sign(payload, secret, {
      expiresIn: "15m",
    });

    const cookiesData = await cookies()

    cookiesData.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 900,
    })

  } catch (error) {
    console.log(error)
    return { success: false, message: `Erro na autenticação, ${error}` }
  }
  return { success: true }

}
