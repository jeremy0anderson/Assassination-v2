const {gql } = require('apollo-server-express');

const typeDefs = gql`
  type Players {
    _id: ID!
    first_name: String
    username: String!
    email: String
    game_code: String!
    is_host: Boolean!
    accessToken: String
  }
  type ActivePlayers{
      _id: ID!,
      username: String!,
      game_code: String!,
      socket_id: String,
      socket_room: String
    
  }
  type Auth{
    accessToken: String
  }

  type Query{
    player(username:String!): Players
    players: [Players]
    game_code(game_code: String!): [Players],
    getActivePlayers: [ActivePlayers],
    getPlayersInSocketRoom(username: String!, socket_room:String):[ActivePlayers]
  }
  type Mutation {
    removeActivePlayer(socket_id: String!): [ActivePlayers],
    getAuthorizedPlayer(token: String, socketID: String): ActivePlayers,
    addActivePlayer(username: String!, game_code: String!, socket_id: String!, socket_room:String!): ActivePlayers,
    registerHost(first_name: String!, last_name: String!, username: String!, email: String!, password: String!): Players,
    registerPlayer(username: String!,game_code: String!): Players,
    login(username: String!, password: String!):Players
  }
`;

module.exports = typeDefs;
