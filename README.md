# NodeJs, Typescript, TDD, DDD, Clean Architecture e SOLID - [Curso](https://www.udemy.com/course/tdd-com-mango/)
[Github](https://github.com/rmanguinho/clean-ts-api)

## Sumário:
[Introdução](#introdução)

## Introdução
- Configurando o Git:
  - Arquivo `test.js`
  - Criar três atalhos para agilizar o desenvolvimento -> `git config --list`
  - Configuração do git para todos os usuários do pc -> `git config --system`
  - Configuraçao do git do meu usuario global para qualquer projeto -> `git config --global`
  - Configuracao apenas para esse projeto -> `git config --local`
  - Iremos editar o git config com o comando -> `git config --global --edit` (Alterando o .gitconfig)
````
[alias]
    s = !git status -s
	c = !git add --all && git commit -m
	l = !git log --pretty=format:'%C(blue)%h%C(red)%d %C(white)%s - %C(cyan)%cn, %C(green)%cr'
````

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