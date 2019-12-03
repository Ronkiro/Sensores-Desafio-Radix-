# Cliente da aplicação de sensores

Este é o repositório da aplicação do lado servidor do desafio de sensores da Radix.

## Tecnologias utilizadas

- .NET Core 3.0 (ASP.NET)
- Entity Framework

## Instalação

### Requisitos:

- .NET Core SDK 3

### `dotnet restore`
Instala todas as dependências necessárias para o projeto.

### Quickstart

```
dotnet restore
dotnet run
```

Isto irá criar um ambiente para testes da API.

Após isto, você poderá acessar o repositório através do endereço localhost:5000 ou localhost:5001.

## Execução

### `dotnet restore`

Restaura as dependências utilizadas no projeto.

### `dotnet run`

Executa a aplicação através de um servidor Kestrel.

### `dotnet run -c Release`

Executa a aplicação em formato de produção.

### `dotnet run --launch-profile <perfil>`

Executa a aplicação com o perfil desejado.

### Executando com docker

```
docker build -t "dev:Dockerfile" .
docker run dev:Dockerfile
```

Para informações extras sobre a elaboração desta solução, acesse o arquivo [PROJECT.md](./PROJECT.md).