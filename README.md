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
   npm install express swagger-ui-express bcryptjs
   ```

## Como rodar

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

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

---

> Projeto para fins educacionais.
