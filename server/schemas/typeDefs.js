const {gql } = require('apollo-server-express');

const typeDefs = gql`
  type Players {
    _id: ID!
    first_name: String
    username: String!
    email: String
    game_code: String!
    accessToken: String!
  }
  type ActivePlayers{
      username: String!
      game_code: String!,
  }
  type Auth{
    accessToken: String
  }

  type Query{
    player(username:String!): Players
    players: [Players]
    game_code(game_code: String!): [Players],
    getActivePlayers: [ActivePlayers]
  }

  type Mutation {
    addActivePlayer(username: String!, game_code: String!): ActivePlayers
    registerHost(first_name: String!, last_name: String!, username: String!, email: String!, password: String!): Players
    registerPlayer(username: String!,game_code: String!): Players
    login(username: String!, password: String!):Players
  }
`;

module.exports = typeDefs;
