const {gql} = require('apollo-server-express');

const typeDefs = gql`
  type Players {
    _id: ID
    first_name: String
    last_name: String
    username: String
    email: String
    password: String,
    game_code: String,
    is_host: String
  }

  type Auth {
    token: ID!
    player: Players
  }

  type Query {
    player: [Players]
    players(username: String!): Players
    game_code(username: String): [Players]
  }

  type Mutation {
    addPlayer(username: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;
module.exports = typeDefs;
