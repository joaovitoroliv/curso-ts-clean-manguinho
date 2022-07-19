// Classe deverá implementar a interface que foi definida em Domain
import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  // Variável das classes
  private readonly encrypter: Encrypter
  private readonly AddAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.AddAccountRepository = addAccountRepository
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    // Criando um novo objeto com todos os atributos que accountData possui e sobrescrevendo o atributo password para hashedPassword
    this.AddAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return new Promise(resolve => resolve(null as any))
  }
}
