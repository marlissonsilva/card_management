/**
 * @jest-environment node
 */
import '@testing-library/jest-dom'
import { createUser } from './create'
import prisma from '@/src/lib/prisma'
import bcrypt from 'bcryptjs'

jest.mock('../../lib/prisma.ts', () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn()
    }
  }
}))

describe('CreateUser', () => {
  it('Deve retornar a mensagem de sucesso ao criar de usuário', async () => {
    const data = {
      username: 'fulano',
      email: 'test@gmail.com',
      password: 'passworD37#',
      invoice_closing: 15,
    };

    (prisma.user.create as jest.Mock).mockResolvedValue({
      uuid: '1234-uuid',
      username: data.username,
      password: await bcrypt.hash(data.password, 10),
      email: data.email,
      invoice_closing: data.invoice_closing
    })

    const result = await createUser(data)

    expect(result).toEqual({ success: true, message: "Usuário criado com sucesso" })

    expect(prisma.user.create).toHaveBeenCalled()
  })

  it("Deve retornar o erro ao criar usuário", async () => {
    const data = {
      username: '',
      email: '',
      password: 'passWord&9',
      invoice_closing: 20
    }

    const result = await createUser(data)

    expect(result).toEqual({ success: false, message: 'Erro ao criar usuário' })
  })
})
