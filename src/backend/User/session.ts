"use server"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface UserPayload {
  uuid: string;
  username: string;
  email: string;
  invoice_closing: number
  iat: number;
  exp: number;
}

export async function getSession(): Promise<UserPayload | null> {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET não está definido.");
    return null;
  }

  try {
    const decoded = jwt.verify(token, secret) as UserPayload;
    return decoded;
  } catch (error) {
    console.log("Sessão inválida:", error);
    return null;
  }
}
