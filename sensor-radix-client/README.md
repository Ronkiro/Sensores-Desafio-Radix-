# Cliente da aplicação de sensores

Este é o repositório da aplicação do lado cliente do desafio de sensores da Radix.

Para informações extras sobre a elaboração desta solução, acesse o arquivo [PROJECT.md](./PROJECT.md).

## Tecnologias utilizadas

- React
- Material-UI
- material-table
- Victory.js
- Moment.js
- lodash
- json-server
- Faker.js

## Instalação

### Requisitos:

- npm (Foi utilizada a versão 6.12.0)

### `npm install`
Instala todas as dependências necessárias para o projeto.

### Quickstart

```
npm i
npm run startmock
```

Isto irá criar um ambiente de testes usando uma API de Mock.

Após o ambiente iniciar, acesse o local http://localhost:5000/.

Você pode apertar CTRL+C para terminar a operação.

## Execução

### `npm start`

Abre a aplicação em modo de desenvolvimento.

### `npm test`

Executa os testes de unidade.

### `npm run build`

Cria um build de release da aplicação.

### `npm run lint`

Executa o ESLint na aplicação para verificar por possíveis melhorias no código.

### `npm run startmock`

Inicia um teste com uma API de mock.

### `npm run serve`

Cria um build de release da aplicação e inicia um servidor para teste da solução construída.

### `npm run mock:api`

Inicia a API de mock sem iniciar a aplicação.


## Configuração

Os arquivos .env.<ambiente> definem as variáveis de ambiente que serão acessíveis durante a execução dos devidos ambientes.

### Variáveis de ambiente para ao software

* REACT_APP_API_URL - Representa a URL da API em execução.

* REACT_APP_API_PORT - Representa a porta da API em execução.

* REACT_APP_API_SUFFIX - Representa o sufixo que o programa irá utilizar para acesso à API.