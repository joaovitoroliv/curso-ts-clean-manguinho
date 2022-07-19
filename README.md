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

- Refatorando os protocolos
- Criando um caso de sucesso para que os valores estejam válidos
- Adicionando `async` aos métodos - preciso adicionar `Promise<T>`
  - Ex: `async add(_account: AddAccountModel): Promise<AccountModel>`

## Jest

- Configurando o Jest e criando scripts de testes:
  - Criando scripts:
    `````javascript
    "test": "jest --passWithNoTests --silent --noStackTrace",
    "test:verbose": "jest --passWithNoTests",
    "test:unit": "npm test -- --watch",````
    `````
  - Teste unitário - `.spec.ts`
  - Teste de integração - `.test.ts`

## Utils Layer

- Criando o EmailValidatorAdapter e Mockando o Validator:
  - Concluimos a construção do nosso controller e ja criamos também o use-case -> agora podemos criar o EmailValidator ou AddAccount
  - Criando testes para o EmailValidator -> `email-validator-adapter.spec.ts` e `email-validator.ts`
  - Instalando biblioteca do "EmailValidator" e seus tipos -> `npm i validator` e `npm i @types/validator -D`
  - Realizando os testes, foi percebido que 'invalid_email@mail.com' é um email válido pela biblioteca validator. Não queremos como saber como validar um email, queremos mockar a biblioteca pois, se o método isValid retornar true, quero que o sut retorne true também."
  - Concluido o Adapter da validação de Email
    - Caso no futuro a gente queira trocar a biblioteca é bem simples

## SignUp API - Data Layer

- Criando o DbAddAccount e integrando com o Encrypter
  - Nessa aula começaremos a testar a camada de Data Layer (Camada que fazemos implementação de algum protocolo que venha do Domain)
  - No nosso caso temos apenas o protocolo `add-account.ts`, iremos criar uma implementação voltada para o Banco de Dados
  - Criar um arquivo `/src/data/usecases/db-add-account.spec.ts`
  - Classe irá receber os dados formatados corretamente do Controller, garantidos que os dados são validos e passou pro AddAccount apenas o nome, email e senha.
  - Precisamos cryptografar a senha com Encrypter
