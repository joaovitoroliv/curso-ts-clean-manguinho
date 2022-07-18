# NodeJs, Typescript, TDD, DDD, Clean Architecture e SOLID - [Curso](https://www.udemy.com/course/tdd-com-mango/)

[Github](https://github.com/rmanguinho/clean-ts-api)

## Sumário:

- [Introdução](#introdução)
- [SignUp API - Presentation Layer](#signup-api---presentation-layer)

## Introdução

- Configurando o Git:
  - Arquivo `test.js`
  - Criar três atalhos para agilizar o desenvolvimento -> `git config --list`
  - Configuração do git para todos os usuários do pc -> `git config --system`
  - Configuraçao do git do meu usuario global para qualquer projeto -> `git config --global`
  - Configuracao apenas para esse projeto -> `git config --local`
  - Iremos editar o git config com o comando -> `git config --global --edit` (Alterando o .gitconfig)

```
[alias]
    s = !git status -s
	c = !git add --all && git commit -m
	l = !git log --pretty=format:'%C(blue)%h%C(red)%d %C(white)%s - %C(cyan)%cn, %C(green)%cr'
```

- Configurando as dependencias:
  - `git init` e `npm init -y`
  - Fazer commit `git c "chore: add npm`
  - Conventional Commits - [ref](https://www.conventionalcommits.org/en/v1.0.0/)
    - types:
      - feat -> feature nova
      - fix -> bug fix
      - chore -> adicionar configuracao ao projeto (biblioteca nova por exemplo)
      - docs -> mudanca na documentacao
      - refactor -> refatoracao de código
  - Adicionou git-commit-msg-linter para garantir o formato de commit -> `npm install -D git-commit-msg-linter`
  - Criou o .gitignore
  - Adicionar typescript e a tipagem `npm i -D typescript @types/node`
    - Criou `tscofig.json`
  - Adicionar o Linter para o Typescript -> `npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin` - [Get Started](https://typescript-eslint.io/docs/linting/)
    - Download da extensão do ESlint
    - Criar arquivo `.eslintrc`
  - Instalar o husky
  - Instalar lint-stage
  - Configurar biblioteca de teste
    - `npm i -D jest @types/jest ts-jest`
    - `jest --init`
- Clean Architecture do nosso projeto:
  - Inversão de dependência: Adapter - ExpressRouteAdapter (Adaptador de Interfaces)
  - Adapter está olhando para a camada de Presentation Layer
  - Adapter aponta para o Express
  - Camada de Utils que pode ser utilizado em qualquer lugar
  - Data layer - implementações da regra de negócio
  - Infra Layer - implementações de interfaces voltadas para Frameworks - BcryptAdapter
  - Main Layer irá criar instância de tudo e vai fazer a composição dos objetos - composite
    <img src=arquitetura.PNG>

## SignUp API - Presentation Layer

- Criar `signup.spec.ts` e `signup.ts`;
- Comitar sempre o arquivo de producao, depois o arquivo de teste
- Tipar meu erro
- Criação do `missing-param-error.ts`
- Criação do bad request
- Criar uma interface em `protocols/controller.ts`

- Utilizando Mocks da maneira correta:
  - Começaremos a utilizar dependencias no SignUpController - Mock
  - Iremos validar se o email passado é um email válido
    - Iremos validar em um componente fora do SignUpController
- Testando exceções e integrando com o Email validator
  - Preciso garantir que o email que será passado no isValid é o email que está sendo enviado no corpo da requisição (está contido no makeSut)
- Vários imports de erros separados -> `index.ts`
- Isolar a criação de um `EmailValidator` para um Factory:

```javascript
const makeEmailValidatorWithError = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(_email: string): boolean {
      throw new Error();
    }
  }
  return new EmailValidatorStub();
};
```

- Integrando com o AddAccount Usecase:

```javascript
// Se chegou até aqui é pq ta validado, portanto deve criar uma conta
return {
  statusCode: 500,
  body: new Error("Deu ruim"),
};
```

- Criar um factory para criação de conta
- Vamos criar uma interface para a regra de negócio - `account.ts` e `add-account.ts`

```javascript
import { AccountModel } from "../models/account";
export interface AddAccountModel {
  name: string;
  email: string;
  password: string;
}
// "A interface AddAccount tem um método add que recebe um AddAccountModel e retorna um AccountModel"
export interface AddAccount {
  add(account: AddAccountModel): AccountModel;
}
```

- Refatorar os protocolos

