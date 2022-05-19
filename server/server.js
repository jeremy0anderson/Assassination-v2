require('dotenv').config();
const
    express = require('express'),
    app = express(),
    path = require('path'),
    PORT = process.env.PORT || 3001,

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
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    // plugins: [ApolloServerPluginDrainHttpServer({httpServer: })],
    // csrfPrevention: true,
    introspection: true
});

//connect to mongoDB
mongoose.connection.once("open", async ()=>{
    //wait for graphql server to start, use all middleware, listen on port
    await server.start();
    server.applyMiddleware({app});
        app.use(express.static(require('path').resolve(__dirname, "./client/build")));
        app.use(express.urlencoded({extended: true}))
        app.use(express.json());
        app.use(require('cors')());

    const httpServer = require('http').createServer(app);

        httpServer.listen({port: PORT}, () => {
            console.log("listening on " + PORT)
        })
});