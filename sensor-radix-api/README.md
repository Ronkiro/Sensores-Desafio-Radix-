# Cliente da aplicação de sensores

Este é o repositório da aplicação do lado servidor do desafio de sensores da Radix.

## Tecnologias utilizadas

- .NET Core 3.0 (ASP.NET)
- Entity Framework
- SQL Server (Developer)

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

## Configuração

A configuração do projeto está contida em [launchSettings.json](./Properties/launchSettings.json).

### Variáveis de ambiente para ao software

* ASPNETCORE_ENVIRONMENT - Representa o tipo de execução do software. (Development/Staging/Production)

* CORS_ALLOWED - Representa os hosts que têm permissão de acesso ao método GET.

* USE_IN_MEMORY_DB - Representa se irá utilizar a memória como banco de dados. (Caso contrário, é necessário configurar *ASPNETCORE_SQLCONNSTR*)

* ASPNETCORE_SQLCONNSTR - Representa a string de conexão que será utilizada para acesso ao banco de dados (Apenas suportando versões de SQL Server)