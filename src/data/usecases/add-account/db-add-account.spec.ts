import { Encrypter } from 'src/data/protocols/encrypter'
import { DbAddAccount } from './db-add-account'

// Interface
interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

// Factory
const makeSut = (): SutTypes => {
  class EncrypterStub {
    // Método encrypt, que recebe um value do tipo string e retorna o value criptografado em forma de string
    async encrypt(_value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)
  return {
    sut,
    encrypterStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
