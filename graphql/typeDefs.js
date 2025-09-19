const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    favorecidos: [String!]!
    saldo: Float!
  }

  type Transfer {
    remetente: String!
    destinatario: String!
    valor: Float!
    data: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    username: String!
    password: String!
    favorecidos: [String!]
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input TransferInput {
    remetente: String!
    destinatario: String!
    valor: Float!
  }

  type Query {
    me: User
    users: [User!]!
    transfers: [Transfer!]!
  }

  type Mutation {
    register(input: RegisterInput!): User!
    login(input: LoginInput!): AuthPayload!
    transfer(input: TransferInput!): Transfer!
    addFavorecido(username: String!, favorecido: String!): User!
  }
`;

module.exports = typeDefs;
