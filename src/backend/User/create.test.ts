import '@testing-library/jest-dom'
import CreateUser from "./create";


describe('CreateUser', () => {
  it('Deve retornar a mensagem de sucesso ao criar de usuário', () => {
    const data = {
      username: 'fulano',
      email: 'test@gmail.com',
      password: 'passworD37#',
      invoice_closing: 15,
    }

    const result = CreateUser(data)

    expect(result).toEqual({ message: "Usuário criado com sucesso" })
  })

  it("Deve retornar o erro ao criar usuário", () => {
    const data = {
      username: '',
      email: '',
      password: 'passWord&9',
      invoice_closing: 20
    }

    const result = CreateUser(data)

    expect(result).toEqual({ message: 'Erro ao criar usuário' })
  })
})
