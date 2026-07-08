import bcrypt from "bcryptjs";
import { passwordValidate } from "../utils/password-validate";
interface CreateUserProps {
  username: string
  email: string
  password: string
  invoice_closing: number
}
export default function CreateUser({ username, email, password, invoice_closing }: CreateUserProps): { message: string } {
  const isMatchPassword = passwordValidate(password)

  if (!isMatchPassword) {
    return { message: "A senha não atende ao critérios." }
  }

  const encrypt_password = bcrypt.hashSync(password)
  console.log(encrypt_password)

  if (!username || !email || !password || !invoice_closing) {
    return { message: "Erro ao criar usuário" }
  }

  return { message: "Usuário criado com sucesso" }
}
