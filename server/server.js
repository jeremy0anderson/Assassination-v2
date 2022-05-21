require('dotenv').config();
const
    express = require('express'),
    app = express(),
    path = require('path'),
    PORT = process.env.PORT || 4000,

    mongoose = require('./config/mongoDB'),
    routes = require('./routes'),

    {typeDefs, resolvers} = require('./schemas'),
    {SocketConnection} = require('./utils/socketIO'),
    {Server} = require('socket.io');



// const graphQLServer = new ApolloServer({
//     typeDefs: require('./schemas').typeDefs,
//     resolvers: require('./schemas').resolvers
// });
//function to start graphql server for api calls


// io.on('connection', (socket)=>{
//     const ws = new SocketConnection(io, socket);
//     console.log(socket.id  + " connected");
// });

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

async function startApolloServer(typeDefs, resolvers) {
    const httpServer = require('http').createServer(app);
    const io = new Server(httpServer, {
        transports: ['websocket'],
        cors: {
            origin: "*"
        }
    })
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: {
            cors: true
        }
    });
    await server.start();
    app.use(express.static(require('path').resolve(__dirname, "./client/build")));
    app.use(express.urlencoded({extended: true}))
    app.use(express.json());
    app.use(require('cors')({
        origin:"*"
    }));
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: PORT}, resolve));
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}
//connect to mongoDB
mongoose.connection.once("open", ()=>{
    //listen on port, start apollo/graphql server
    startApolloServer(typeDefs, resolvers);
});