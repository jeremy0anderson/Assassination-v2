// const { ApolloServer } =require('apollo-server-express');
// const { ApolloServerPluginDrainHttpServer } =require('apollo-server-core');
//
// async function startApolloServer(typeDefs, resolvers, mainServer, app, port) {
//     const server = new ApolloServer({
//         typeDefs,
//         resolvers,
//         csrfPrevention: true,
//         plugins: [ApolloServerPluginDrainHttpServer({ mainServer })],
//     });
//
//     await server.start();
//     server.applyMiddleware({ app });
//     await new Promise(resolve => httpServer.listen({ port: port }, resolve));
//     console.log(`Server ready at http://localhost:${port}/${server.graphqlPath}`);
// }
// module.exports = startApolloServer;