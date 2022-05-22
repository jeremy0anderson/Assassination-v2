const typeDefs = require('./typeDefs');
const {resolvers, SocketConnection, bindToActiveUser} = require('./resolvers');

module.exports = {typeDefs, resolvers}