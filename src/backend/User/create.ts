"use server";

import bcrypt from "bcryptjs";
import { passwordValidate } from "../utils/password-validate";
import prisma from "@/src/lib/prisma";
import { userSchema } from "./validate/zod";
import { CreateUserProps } from "./types";

export async function createUser(
  formData: CreateUserProps,
): Promise<{ success: boolean; message: string }> {
  const validateUser = userSchema.safeParse(formData);
  if (!validateUser.success) {
    return { success: false, message: "Erro ao criar usuário" };
  }

  const { username, email, password, invoice_closing } = validateUser.data;

  const user = await prisma.user.findUnique({
    where: { email: formData.email },
  });

  if (user) {
    return { success: false, message: "Usuário já possui conta cadastrada!" };
  }

  const isMatchPassword = passwordValidate(password);
  if (!isMatchPassword) {
    return { success: false, message: "A senha não atende ao critérios." };
  }

  try {
    const encrypt_password = await bcrypt.hash(password, 10);

    const data = {
      username,
      email,
      password: encrypt_password,
      invoice_closing,
    };

    await prisma.user.create({ data });
    return { success: true, message: "Usuário criado com sucesso" };
  } catch (error) {
    console.log(error);
    return { success: false, message: `Erro ao criar usuário, ${error}` };
  }
}
