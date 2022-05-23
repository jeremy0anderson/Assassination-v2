require('dotenv').config();
const
    express = require('express'),
    app = express(),
    path = require('path'),
    PORT = process.env.PORT || 4000,
    mongoose = require('./config/mongoDB'),
    routes = require('./routes'),
    {verifyToken} = require('./utils/auth'),
    jwt = require('jsonwebtoken'),
    {ActivePlayers} = require('./models'),
    {typeDefs, resolvers} = require('./schemas'),
    {SocketConnection, connect} = require('./utils/socketIO'),
    {Server} = require('socket.io');
app.use(require('cors')({
    origin: "http://localhost:3000"
}));
const httpServer = require('http').createServer(app);
const io = new Server(httpServer, {
    // transports: ['websocket', 'polling'],
    cors: {
        origin: "http://localhost:3000"
    }
});
// This is broken but kept for reference
//io.use((socket, next)=>{
//     let token;
//     if (socket.handshake.headers.authorization !== null){
//         token = socket.handshake.headers.authorization.slice(1, socket.handshake.headers.authorization.length-1);
//         return socket.token = token;
//     } else {
//         socket.token = token = "";
//         console.log(socket.token);
//     }
//     console.log(token);
//
// });
// io.on('connection', async(socket)=>{
//     console.log(socket.id)
//     socket.once('hello', (data)=>{
//         console.log(data);
//     })
//     // const token = socket.handshake.headers.authorization;
//     // let fixed = token.slice(1, token.length-1);
//     // if (fixed) {
//     //     let verified = await jwt.verify(fixed, process.env.JWT_SECRET);
//     //     console.log(verified)
//     //     socket.on('hello', (message) => {
//     //         console.log(message);
//     //     })
//     //     socket.join(verified.game_code);
//     //     socket.leave(socket.id);
//     //     socket.game_code = verified.game_code;
//     //
//     //     let playerToAdd = {
//     //         _id: verified._id,
//     //         username: verified.username,
//     //         game_code: verified.game_code,
//     //         socket_id: socket.id,
//     //         socket_room: socket.game_code
//     //
//     //     }
//     //     let check = await ActivePlayers.findOne({socket_id: socket.id}).then((player)=>{
//     //         if(player){
//     //             return;
//     //         }
//     //         else{
//     //             ActivePlayers.create(playerToAdd);
//     //         }
//     //     });
//     //     await check;
//     //     let activePlayers = resolvers.Query.getActivePlayers();
//     //     console.log(activePlayers)
//     //     io.emit('hello-back', activePlayers);
//     //
//         socket.on("disconnect", (reason) => {
//             ActivePlayers.deleteOne({socket_id: socket.id});
//             console.log(reason);
//             io.sockets.removeAllListeners(socket);
//         })
//     // }
//     // else {return}
// })

// const graphQLServer = new ApolloServer({
//     typeDefs: require('./schemas').typeDefs,
//     resolvers: require('./schemas').resolvers
// });
//function to start graphql server for api calls


// io.on('connection', (socket)=>{
//     const ws = new SocketConnection(io, socket);
//     console.log(socket.id  + " connected");
// });

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
