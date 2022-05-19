const {gql, } = require('apollo-server-express');

const typeDefs = gql`
  type Players {
    _id: ID
    first_name: String
    last_name: String
    username: String!
    email: String
    password: String,
    game_code: String!
    is_host: String
  }
  type ActivePlayers{
      username: String!
      game_code: String!
  }

  type Auth {
    token: String!
  }

  type Query{
    player(username:String!): Players
    players: [Players]
    game_code(game_code: String!): [Players]
  }

  type Mutation {
    addPlayer(username: String!, game_code: String!): ActivePlayers
    registerHost(first_name: String!, last_name: String!, username: String!, email: String!, password: String!): Players
    registerPlayer(username: String!,game_code: String!): Players
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
