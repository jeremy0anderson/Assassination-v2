require('dotenv').config();
const
    express = require('express'),
    app = express(),
    path = require('path'),
    PORT = process.env.PORT || 4000,
    mongoose = require('./config/mongoDB'),
    // routes = require('./routes'),
    // {verifyToken} = require('./utils/auth'),
    jwt = require('jsonwebtoken'),
    expressjwt = require('express-jwt').expressjwt,
    socketioJwt = require('socketio-jwt'),
    {ActivePlayers} = require('./models'),
    {typeDefs, resolvers} = require('./schemas'),
    {SocketConnection, connect} = require('./utils/socketIO'),
    {Server} = require('socket.io');
app.use(require('cors')({
    origin: "http://localhost:3000"
}));
//decode any req auth jwt headers
// app.use(expressjwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ['HS256'],
//     credentialsRequired: false,
//
// }))

//http server
const httpServer = require('http').createServer(app);
//attach websocket server + decode athorization header for each socket connected
const io = new Server(httpServer, {
    transports: ['websocket', 'polling'],
    cors: {
        origin: "http://localhost:3000"
    }
});
//decode authorization header sent with socket
io.use(socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    handshake: true,
    auth_header_required: false
}));
//listen for sockets -- return events (socket.on('...')
io.on('connection', async (socket)=>{
    console.log(socket.decoded_token.username);

    const activeSockets = Array.from(await io.allSockets());
    const newPlayer = await ActivePlayers.create({
        username: socket.decoded_token.username,
        game_code: socket.decoded_token.game_code,
        socket_id: socket.id
    });

    const activePlayers = await ActivePlayers.find({socket_id: {$in: activeSockets}});
    console.log(activePlayers);

    io.emit('authorized', activePlayers)





    socket.on('disconnect', async(reason)=>{
        await ActivePlayers.findOneAndDelete({socket_id: socket.id})
        console.log(reason);
        io.emit('updatedOnDisconnect', activePlayers)
        io.removeAllListeners(socket);
    })
})


//requires Apollo server to allow Graph Ql usage
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

//Starts new Apollo server and establishes typeDefs and Revolvers
async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cors: {
            origin: ['http://localhost:3000',"https://studio.apollographql.com"]
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: ({req})=>{
            const auth = req.headers.authorization || "";
            return {
                auth
            }
        },
    });
    //await graphql server start
    await server.start();
    app.use(express.static(require('path').resolve(__dirname, "./client/build")));
    app.use(express.urlencoded({extended: true}))
    app.use(express.json());

    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: PORT}, resolve));
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}
//connect to mongoDB
mongoose.connection.once("open", ()=>{
    //listen on port, start apollo/graphql server
    startApolloServer(typeDefs, resolvers);


});
