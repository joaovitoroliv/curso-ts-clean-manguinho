import { Encrypter } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

// Interface
interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

// Factory - Função que não recebe nada e retorna um Encrypter
const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    // Método encrypt, que recebe um value do tipo string e retorna o value criptografado em forma de string
    async encrypt(_value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

// Factory
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
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
  test('Should throw if Encrypter throws', async () => {
    // O que acontece aqui? Mockei uma dependencia do Sut (minha dependencia retorna uma exceção). Quando eu chamar o meu sut.add é esperado que também seja retornado uma exceção
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    expect(promise).rejects.toThrow()
  })
})
