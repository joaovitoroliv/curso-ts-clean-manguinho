import { AddAccountModel } from '../../domain/usecases/add-account'
import { AccountModel } from '../../domain/models/account'

export interface AddAccountRepository{
    // Assinatura do método
    add(accountData: AddAccountModel): Promise<AccountModel>
}
