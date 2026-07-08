interface CreateUserProps {
  username: string
  email: string
  password: string
  invoice_closing: number
}
export default function CreateUser({ username, email, password, invoice_closing }: CreateUserProps): { message: string } {
  console.log(username, email, password, invoice_closing)
  return { message: "Usuário criado com sucesso" }
}
