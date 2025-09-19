# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários, adição de favorecidos e transferências de valores entre usuários. O objetivo é servir de base para estudos de testes e automação de APIs.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)
- Banco de dados em memória (variáveis)

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:
   ```bash
   npm install
   # ou instalar dependências específicas:
   npm install express@^4.18.2 apollo-server-express@^3.11.1 graphql@^16.6.0 cors bcryptjs jsonwebtoken swagger-ui-express
   ```

## Como rodar

```bash
# Rodar servidor REST + GraphQL (REST existente continua em server.js na raiz)
node server.js

# Rodar apenas o servidor GraphQL (dentro da pasta graphql)
node graphql/server.js
```

O servidor REST padrão permanece em `http://localhost:3000`.
O endpoint GraphQL estará em `http://localhost:4000/graphql` (quando iniciado via `graphql/server.js`).

## Endpoints principais

- `POST /register` — Registro de usuário
- `POST /login` — Login de usuário
- `GET /users` — Listar usuários
- `POST /users/:username/favorecidos` — Adicionar favorecido
- `POST /transfer` — Realizar transferência
- `GET /transfers` — Listar transferências

## Regras de negócio
- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.
- O saldo inicial de cada usuário é R$ 10.000,00.

## Observações
- Todos os dados são armazenados em memória e serão perdidos ao reiniciar a aplicação.
- O projeto está dividido em camadas: `controller`, `service` e `model`.

## Testes
Para testar a API, utilize ferramentas como Postman, Insomnia ou scripts automatizados (ex: Supertest).

Exemplo de query e mutation GraphQL (use em /graphql):

Query para listar usuários:

```graphql
query {
   users { username favorecidos saldo }
}
```

Mutations:

```graphql
mutation {
   register(input: { username: "Jones", password: "123456" }) { username }
}

mutation {
   login(input: { username: "Jones", password: "123456" }) {
      token
      user { username saldo }
   }
}

mutation {
   transfer(input: { remetente: "Jones", destinatario: "Silva", valor: 100 }) {
      remetente destinatario valor data
   }
}
```

---

> Projeto para fins educacionais.
