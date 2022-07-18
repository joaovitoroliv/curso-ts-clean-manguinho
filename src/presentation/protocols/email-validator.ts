export interface EmailValidator{
    // Interface contém uma função 'isValid' que recebe um email do tipo string e retorna um booleano
    isValid(email:string): boolean
}
