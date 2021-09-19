import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type User {
      id: ID!,
      name: String!,
      age: Int!,
  }

  type Mutation {
       createUser(name: String!, age: Int!): User!
  }
`;
