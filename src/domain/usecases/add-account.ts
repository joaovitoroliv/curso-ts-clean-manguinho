import { AccountModel } from '../models/account'
export interface AddAccountModel{
    name: string,
    email: string,
    password: string
}

// "A interface AddAccount tem um método add que recebe um AddAccountModel e retorna um AccountModel"
export interface AddAccount{
    add(account: AddAccountModel): AccountModel
}
