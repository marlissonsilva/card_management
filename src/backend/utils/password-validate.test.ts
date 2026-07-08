import { passwordValidate } from "./password-validate"

describe("Password Validate", () => {
  it("deve retornar o sucesso na composição da senha", () => {
    const password = "Password72&"

    const result = passwordValidate(password)

    expect(result).toEqual(true)
  })

  it('deve retornar o erro na composição da senha', () => {
    const password = "password"
    expect(passwordValidate(password)).toEqual(false)
  })
})
