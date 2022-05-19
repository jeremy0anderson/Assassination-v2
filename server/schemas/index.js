const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { ApolloServer } =require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } =require('apollo-server-core');

async function startApolloServer(typeDefs, resolvers, mainServer, app, port) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer: mainServer })],
    });

    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => mainServer.listen({ port: port }, resolve));
    console.log(`Server ready at http://localhost:${port}/${server.graphqlPath}`);
}

module.exports = {typeDefs, resolvers, startApolloServer}